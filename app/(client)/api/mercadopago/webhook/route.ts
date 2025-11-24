// app/api/mercadopago/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { paymentClient } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const searchParams = request.nextUrl.searchParams;
    
    console.log('Webhook MercadoPago recebido:', {
      query: Object.fromEntries(searchParams.entries()),
      body: body ? JSON.parse(body) : null
    });

    const query: { [key: string]: string | string[] } = {};
    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }

    // Processar notificação de pagamento
    if (query.type === 'payment') {
      const paymentId = query['data.id'];
      
      if (typeof paymentId === 'string') {
        try {
          // Buscar informações detalhadas do pagamento usando a nova API
          const paymentData = await paymentClient.get({ id: paymentId });
          
          console.log('Dados do pagamento:', {
            id: paymentData.id,
            status: paymentData.status,
            orderNumber: paymentData.external_reference,
            amount: paymentData.transaction_amount
          });
          
          await processMercadoPagoPayment(paymentData);
        } catch (paymentError) {
          console.error('Erro ao buscar dados do pagamento:', paymentError);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook MercadoPago:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}

async function processMercadoPagoPayment(paymentData: any) {
  const { 
    external_reference, 
    status, 
    status_detail, 
    transaction_amount,
    date_approved,
    payment_method_id,
    installments
  } = paymentData;
  
  console.log(`Processando pagamento para pedido: ${external_reference}`);
  console.log(`Status: ${status}, Detalhe: ${status_detail}`);
  
  // Aqui você deve integrar com seu sistema de pedidos
  switch (status) {
    case 'approved':
      // Pagamento aprovado
      await updateOrderStatus(external_reference, 'paid', {
        transaction_amount,
        date_approved,
        payment_method: payment_method_id,
        installments
      });
      break;
    case 'pending':
      // Pagamento pendente
      await updateOrderStatus(external_reference, 'pending');
      break;
    case 'rejected':
      // Pagamento rejeitado
      await updateOrderStatus(external_reference, 'failed');
      break;
    case 'cancelled':
      // Pagamento cancelado
      await updateOrderStatus(external_reference, 'cancelled');
      break;
    default:
      console.log('Status não tratado:', status);
  }
}

async function updateOrderStatus(
  orderNumber: string, 
  status: string, 
  paymentDetails?: any
) {
  // Implemente a lógica para atualizar o status do pedido no seu banco de dados
  console.log(`Atualizando pedido ${orderNumber} para status: ${status}`, paymentDetails);
  
  try {
    // Aqui você pode:
    // 1. Atualizar o pedido no Sanity
    // 2. Enviar email de confirmação
    // 3. Atualizar estoque
    // 4. Registrar no seu sistema
    
    console.log(`✅ Pedido ${orderNumber} atualizado com sucesso para: ${status}`);
  } catch (error) {
    console.error(`❌ Erro ao atualizar pedido ${orderNumber}:`, error);
  }
}