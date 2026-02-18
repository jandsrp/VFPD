"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Reveal>
                    <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <ShoppingCart className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h2>
                        <p className="text-gray-500 mb-8 text-lg">Parece que você ainda não adicionou nenhum produto. Explore nosso catálogo!</p>
                        <Link href="/produtos">
                            <Button className="btn-primary text-xl px-8 py-6">
                                Ver Produtos
                            </Button>
                        </Link>
                    </div>
                </Reveal>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Reveal>
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/produtos" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho ({totalItems})</h1>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cart.map((item, idx) => (
                            <Reveal key={item.id} delay={idx * 0.1}>
                                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full">
                                    <CardContent className="p-4 flex flex-col h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <AnimatedImage
                                                src={item.images?.[0] || item.url_imagem || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'}
                                                alt={item.nome}
                                                containerClassName="w-20 h-20 flex-shrink-0"
                                                className="rounded-lg object-cover"
                                            />
                                            <div className="flex-grow min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{item.nome}</h3>
                                                <p className="text-gray-500 text-xs mb-2">{item.categoria}</p>
                                                {(item.description || item.descricao) && (
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-snug">
                                                        {item.description || item.descricao}
                                                    </p>
                                                )}
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {item.color && (
                                                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold border border-gray-200">
                                                            Cor: {item.color}
                                                        </span>
                                                    )}
                                                    {item.size && (
                                                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold border border-gray-200">
                                                            Tam: {item.size}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-xl font-bold text-primary mb-4">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price || item.preco)}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-gray-500 hover:text-primary"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <span className="font-bold text-base min-w-[24px] text-center">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-gray-500 hover:text-primary"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:bg-red-50 rounded-full h-8 w-8"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <Reveal delay={0.3}>
                        <Card className="border-none shadow-lg bg-white sticky top-24">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-6 pb-6 border-b">Resumo do Pedido</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Frete</span>
                                        <span className="text-green-600 font-bold italic">Grátis*</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-2xl font-black text-gray-900 mb-8 pt-6 border-t">
                                    <span>Total</span>
                                    <span className="text-primary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span>
                                </div>

                                <CheckoutModal />
                            </CardContent>
                        </Card>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
