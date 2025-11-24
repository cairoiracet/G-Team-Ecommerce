"use client";

import { createMercadoPagoCheckout } from "@/actions/mercadopago";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddressForm, AddressData } from "@/components/address/address-form";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja limpar o carrinho?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Carrinho limpo com sucesso!");
    }
  };

  const handleAddressSubmit = (addressData: AddressData) => {
    setAddress(addressData);
    setShowAddressForm(false);
    toast.success("Endereço salvo com sucesso!");
  };

  const handleCheckout = async () => {
    if (groupedItems.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    if (!address) {
      toast.error("Por favor, adicione um endereço de entrega");
      setShowAddressForm(true);
      return;
    }

    setLoading(true);
    try {
      const metadata = {
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerName: user?.fullName ?? "Cliente",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "cliente@email.com",
        clerkUserId: user?.id,
        address: address, // Incluindo o endereço no metadata
      };

      const checkoutUrl = await createMercadoPagoCheckout(groupedItems, metadata);
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Não foi possível gerar o link de pagamento");
      }
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Carrinho de Compras</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border bg-white rounded-md">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                        >
                          <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="text-base font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variante: {" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className="text-sm capitalize">
                                  Status: {" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Adicionar aos Favoritos
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success("Produto removido com sucesso!");
                                        }}
                                        className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold bg-red-600">
                                      Remover produto
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Limpar Carrinho
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">
                        Resumo do Pedido
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Subtotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Desconto</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-lg font-bold text-black"
                          />
                        </div>
                        <Button
                          className="w-full rounded-full font-semibold tracking-wide hoverEffect bg-green-600 hover:bg-green-700"
                          size="lg"
                          disabled={loading || !address}
                          onClick={handleCheckout}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processando...
                            </span>
                          ) : (
                            `Pagar R$ ${getTotalPrice().toFixed(2)}`
                          )}
                        </Button>
                        
                        {/* Informações de segurança */}
                        <div className="text-center text-sm text-gray-600 mt-4">
                          <p>✅ Pagamento 100% seguro via MercadoPago</p>
                          <p>🔒 Seus dados estão protegidos</p>
                        </div>
                      </div>
                    </div>

                    {/* Seção de Endereço */}
                    <div className="mt-5">
                      {!address ? (
                        showAddressForm ? (
                          <AddressForm onAddressSubmit={handleAddressSubmit} />
                        ) : (
                          <div className="bg-white rounded-md p-6 border">
                            <h3 className="text-lg font-semibold mb-4">Endereço de Entrega</h3>
                            <p className="text-gray-600 mb-4">Você precisa adicionar um endereço de entrega antes de finalizar a compra.</p>
                            <Button 
                              onClick={() => setShowAddressForm(true)}
                              className="w-full"
                            >
                              Adicionar Endereço
                            </Button>
                          </div>
                        )
                      ) : (
                        <div className="bg-white rounded-md p-6 border">
                          <h3 className="text-lg font-semibold mb-2">Endereço de Entrega</h3>
                          <p className="text-gray-700">
                            {address.street}, {address.number}
                            {address.complement && `, ${address.complement}`}<br />
                            {address.city} - {address.state}<br />
                            CEP: {address.zipCode}
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddressForm(true)}
                            className="w-full mt-4"
                          >
                            Alterar Endereço
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Resumo do pedido para mobile */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 border-t">
                  <div className="bg-white p-4 rounded-lg mx-4 mb-4">
                    <h2 className="font-semibold mb-3">Resumo do Pedido</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Desconto</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide hoverEffect bg-green-600 hover:bg-green-700"
                        size="lg"
                        disabled={loading || !address}
                        onClick={handleCheckout}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processando...
                          </span>
                        ) : (
                          `Pagar R$ ${getTotalPrice().toFixed(2)}`
                        )}
                      </Button>
                      
                      {/* Informações de segurança mobile */}
                      <div className="text-center text-xs text-gray-600 mt-2">
                        <p>✅ Pagamento 100% seguro</p>
                        <p>🔒 Dados protegidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;