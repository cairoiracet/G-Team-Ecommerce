// actions/mercadopago.ts
"use server";

import { preferenceClient } from "@/lib/mercadopago";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createMercadoPagoCheckout(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Verificar se há itens no carrinho
    if (!items || items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // Configurar os itens para o MercadoPago
    const itemsMP = items.map((item) => {
      const unitPrice = item.product?.price ? Number(item.product.price) : 0;
      
      return {
        id: item.product?._id || `product-${Date.now()}`,
        title: item.product?.name || "Produto",
        description: item.product?.description || "Descrição do produto",
        picture_url: item.product?.images && item.product.images.length > 0 
          ? urlFor(item.product.images[0]).url() 
          : undefined,
        category_id: "ecommerce",
        quantity: item.quantity,
        currency_id: "BRL",
        unit_price: unitPrice,
      };
    });

    // Calcular o total para validação
    const totalAmount = items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);

    console.log('Criando checkout MercadoPago:', {
      itemsCount: items.length,
      totalAmount,
      customer: metadata.customerEmail
    });

    // Criar preferência de pagamento usando a nova API
    const response = await preferenceClient.create({
      body: {
        items: itemsMP,
        payer: {
          name: metadata.customerName,
          email: metadata.customerEmail,
        },
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12,
        },
        external_reference: metadata.orderNumber,
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderNumber=${metadata.orderNumber}`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        },
        auto_return: "approved",
        statement_descriptor: "LOJA",
        metadata: {
          order_number: metadata.orderNumber,
          customer_name: metadata.customerName,
          customer_email: metadata.customerEmail,
          clerk_user_id: metadata.clerkUserId,
        },
      }
    });
    
    console.log('Checkout criado com sucesso:', response.id);
    console.log(response);
    
    return response.sandbox_init_point;
  } catch (error) {
    console.error("Erro ao criar checkout MercadoPago:", error);
    throw new Error(`Falha ao processar pagamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}