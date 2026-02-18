"use client";

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Instagram } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Mensagem enviada com sucesso!", {
            description: "Responderemos o mais breve possível.",
        });
    };

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="bg-gray-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Reveal>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Contato</h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                            Estamos prontos para atender suas demandas e impulsionar seu sucesso.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left Column: Contact Cards & Image */}
                        <div className="md:col-span-5 space-y-6">
                            <Reveal delay={0.1}>
                                <div className="space-y-6">
                                    {/* Email Card */}
                                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex items-center gap-6 group hover:border-[#a65d37]/20 transition-all">
                                        <div className="w-14 h-14 bg-[#f4e4d4] rounded-2xl flex items-center justify-center text-[#a65d37] group-hover:bg-[#a65d37] group-hover:text-white transition-all duration-300">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">E-mail</p>
                                            <p className="text-base lg:text-lg font-black text-gray-900 tracking-tight">contato@xxxx.com</p>
                                        </div>
                                    </div>

                                    {/* WhatsApp Card */}
                                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex items-center gap-6 group hover:border-[#25D366]/20 transition-all">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                            <Phone className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">WhatsApp</p>
                                            <p className="text-base lg:text-lg font-black text-gray-900 tracking-tight">(xx) xxxxx-xxxx</p>
                                        </div>
                                    </div>

                                    {/* Instagram Card */}
                                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex items-center gap-6 group hover:border-pink-500/20 transition-all">
                                        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                                            <Instagram className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Instagram</p>
                                            <p className="text-base lg:text-lg font-black text-gray-900 tracking-tight">@xxxx.rj</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Image with Caption */}
                            <Reveal delay={0.3}>
                                <div className="relative rounded-[40px] overflow-hidden shadow-2xl group aspect-[4/3] mt-4">
                                    <AnimatedImage
                                        src="/images/img/img-4.png"
                                        alt="Makramando RJ"
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-8 right-8 lg:bottom-10 lg:left-10 lg:right-10">
                                        <p className="text-white text-lg lg:text-2xl font-black leading-tight tracking-tight">
                                            Feito à mão com carinho e algodão natural.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Column: Form Card */}
                        <div className="md:col-span-7">
                            <Reveal delay={0.2}>
                                <div className="bg-white p-6 md:p-8 lg:p-12 rounded-[48px] border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.04)]">
                                    <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-8 tracking-tight">Envie sua mensagem</h3>

                                    <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-gray-900 tracking-tight ml-1">Seu Nome</label>
                                                <input
                                                    type="text"
                                                    placeholder="Fulana Silva"
                                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-[20px] px-6 py-4 lg:py-5 outline-none focus:ring-2 focus:ring-[#a65d37]/10 focus:border-[#a65d37] focus:bg-white transition-all text-base lg:text-lg font-medium placeholder:text-gray-300"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-gray-900 tracking-tight ml-1">Seu E-mail</label>
                                                <input
                                                    type="email"
                                                    placeholder="fulana@email.com"
                                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-[20px] px-6 py-4 lg:py-5 outline-none focus:ring-2 focus:ring-[#a65d37]/10 focus:border-[#a65d37] focus:bg-white transition-all text-base lg:text-lg font-medium placeholder:text-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-gray-900 tracking-tight ml-1">WhatsApp / Telefone</label>
                                                <input
                                                    type="text"
                                                    placeholder="(xx) xxxxx-xxxx"
                                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-[20px] px-6 py-4 lg:py-5 outline-none focus:ring-2 focus:ring-[#a65d37]/10 focus:border-[#a65d37] focus:bg-white transition-all text-base lg:text-lg font-medium placeholder:text-gray-300"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-gray-900 tracking-tight ml-1">Sobre o que vamos falar?</label>
                                                <select
                                                    className="w-full bg-gray-50/50 border border-gray-100 rounded-[20px] px-6 py-4 lg:py-5 outline-none focus:ring-2 focus:ring-[#a65d37]/10 focus:border-[#a65d37] focus:bg-white transition-all text-base lg:text-lg font-medium appearance-none cursor-pointer"
                                                    required
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Selecione um assunto</option>
                                                    <option value="orcamento">Orçamento Personalizado</option>
                                                    <option value="duvidas">Dúvidas sobre Pedido</option>
                                                    <option value="parcerias">Parcerias / Eventos</option>
                                                    <option value="outros">Outros Assuntos</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-900 tracking-tight ml-1">Sua Mensagem</label>
                                            <textarea
                                                placeholder="Olá, gostaria de saber mais sobre..."
                                                className="w-full bg-gray-50/50 border border-gray-100 rounded-[20px] px-6 py-4 lg:py-5 outline-none focus:ring-2 focus:ring-[#a65d37]/10 focus:border-[#a65d37] focus:bg-white transition-all h-32 lg:h-40 text-base lg:text-lg font-medium resize-none placeholder:text-gray-300"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <Button
                                                type="submit"
                                                className="flex-1 bg-[#a65d37] hover:bg-[#8e4f2f] text-white text-lg font-black py-7 lg:py-8 rounded-[24px] h-auto shadow-xl shadow-[#a65d37]/20 transition-all duration-300 flex items-center justify-center gap-3 group"
                                            >
                                                Enviar E-mail
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </Button>

                                            <Button
                                                type="button"
                                                onClick={() => window.open('https://wa.me/5521997657494', '_blank')}
                                                className="flex-1 bg-[#25D366] hover:bg-[#1ebc57] text-white text-lg font-black py-7 lg:py-8 rounded-[24px] h-auto shadow-xl shadow-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-3 group"
                                            >
                                                Conversar no WhatsApp
                                                <Phone className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
