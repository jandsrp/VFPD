"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { submitOrderAction } from '@/lib/actions/orders';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const CheckoutModal = () => {
    const { data: session } = useSession();
    const context = useCart();
    const { cart, totalPrice, clearCart } = context;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: session?.user?.name || '',
        email: session?.user?.email || '',
        telefone: '',
        observacoes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await submitOrderAction(formData, cart, totalPrice);

            if (result.success) {
                toast.success("Pedido enviado!", {
                    description: `Obrigado pela sua compra! Seu pedido #${result.orderId} foi registrado.`,
                });
                clearCart();
            } else {
                throw new Error(result.error || "Erro desconhecido");
            }
        } catch (error: any) {
            toast.error("Erro no checkout", {
                description: error.message || "Não foi possível processar seu pedido. Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!session) {
        return (
            <Link href={`/auth/login?callbackUrl=/carrinho`} className="w-full">
                <Button className="w-full bg-gray-900 hover:bg-primary text-white text-xl py-8 rounded-2xl h-auto font-black shadow-xl">
                    ENTRAR PARA COMPRAR
                </Button>
            </Link>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xl py-8 rounded-2xl h-auto font-black shadow-xl shadow-primary/20">
                    FINALIZAR PEDIDO
                </Button>
            </DialogTrigger>
            <DialogContent className="!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 sm:max-w-[550px] w-[95vw] max-h-[85vh] border-none shadow-2xl rounded-[3rem] bg-white p-0 flex flex-col outline-none overflow-hidden z-[100]">
                <div className="p-8 sm:p-10 flex flex-col h-full overflow-hidden">
                    <DialogHeader className="mb-6 flex-shrink-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <DialogTitle className="text-3xl font-black text-gray-900 border-l-8 border-secondary pl-4">
                                Quase lá!
                            </DialogTitle>
                            <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center sm:text-right">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest mb-1">Total do Pedido</span>
                                <span className="text-2xl font-black text-primary">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2 space-y-6 scroll-smooth custom-scrollbar">
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="nome" className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">Nome Completo</Label>
                                <Input
                                    id="nome"
                                    required
                                    placeholder="Seu nome completo"
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-primary/20 text-base transition-all shadow-sm"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="seu@email.com"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-primary/20 text-base transition-all shadow-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone" className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">WhatsApp</Label>
                                    <Input
                                        id="telefone"
                                        required
                                        placeholder="(XX) 9XXXX-XXXX"
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-primary/20 text-base transition-all shadow-sm"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="observacoes" className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">Observações (opcional)</Label>
                                <Textarea
                                    id="observacoes"
                                    placeholder="Alguma instrução especial para a entrega?"
                                    className="min-h-[120px] rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:border-primary/20 text-base transition-all shadow-sm p-4"
                                    value={formData.observacoes}
                                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4 pb-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 hover:bg-primary text-white h-16 rounded-[20px] text-lg font-black gap-3 shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 transition-transform" />
                                        Confirmar e Enviar Pedido
                                    </>
                                )}
                            </Button>
                        </div>

                        <p className="text-center text-[10px] text-gray-400 font-medium px-4 leading-relaxed uppercase tracking-widest">
                            Ao confirmar, nossos consultores entrarão em contato via WhatsApp para finalizar detalhes.
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
