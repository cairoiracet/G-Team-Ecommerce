// app/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const orderNumber = searchParams.get('orderNumber');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    if (orderNumber) {
      // Aqui você pode buscar detalhes do pedido da sua API
      fetchOrderDetails(orderNumber);
    }
  }, [orderNumber]);

  const fetchOrderDetails = async (orderNumber: string) => {
    try {
      // Implemente a busca dos detalhes do pedido
      // const response = await fetch(`/api/orders/${orderNumber}`);
      // const order = await response.json();
      // setOrderDetails(order);
      
      // Por enquanto, vamos simular dados
      setOrderDetails({
        number: orderNumber,
        status: 'paid',
        createdAt: new Date().toISOString(),
        items: [],
        total: 0
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes do pedido:', error);
    }
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pagamento Aprovado!
          </h1>
          
          <div className="space-y-4 mb-6">
            <p className="text-lg text-gray-700">
              Obrigado pela sua compra!
            </p>
            
            {orderNumber && (
              <div className="bg-gray-50 rounded-lg p-4">
                <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Número do pedido</p>
                <p className="text-lg font-semibold text-gray-900">
                  {orderNumber}
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4">
              <Mail className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Você receberá um e-mail com os detalhes da compra e informações de rastreamento.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                Continuar Comprando
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/orders">
                Acompanhar Pedidos
              </Link>
            </Button>
          </div>

          {/* Informações adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Precisa de ajuda?
            </h3>
            <p className="text-sm text-gray-600">
              Entre em contato conosco:{" "}
              <a href="mailto:suporte@loja.com" className="text-blue-600 hover:underline">
                suporte@loja.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}