"use client";

import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Star, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedImage } from '@/components/ui/AnimatedImage';

export default function Home() {
    return (
        <div className="flex flex-col w-full">
            <HeroSlider />

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { icon: ShieldCheck, title: "Qualidade Premium", desc: "Produtos selecionados para garantir a melhor proteção e acabamento." },
                            { icon: Truck, title: "Entrega Rápida", desc: "Logística eficiente para que seu negócio nunca pare por falta de suprimentos." },
                            { icon: Star, title: "Parceria Real", desc: "Não somos apenas fornecedores, somos parceiros do seu crescimento." }
                        ].map((feature, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section id="sobre-nos" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="md:w-1/2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-3"></div>
                                    <AnimatedImage
                                        src="/images/img/img-1.png"
                                        alt="Equipe VFPD no Galpão"
                                        className="relative rounded-3xl shadow-2xl z-10"
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <h2 className="text-4xl font-bold text-gray-900 mb-6 italic border-l-8 border-secondary pl-6">
                                    "Você Faz Parte Disso"
                                </h2>
                                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                    A VFPD Comercial e Bazar LTDA nasceu com o propósito de ser mais do que apenas uma distribuidora. Somos o elo que fortalece o seu negócio através de embalagens de confiança e artigos de papelaria que encantam.
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Nossa história é construída dia após dia, com foco na excelência do atendimento e na qualidade imbatível de cada bobina, fita ou caixa que entregamos. Porque para nós, o seu sucesso é o nosso maior objetivo.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                                O que dizem nossos parceiros
                            </h2>
                            <div className="w-24 h-1.5 bg-[#a65d37] mx-auto rounded-full mb-8"></div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Ricardo Santos",
                                role: "Proprietário de Supermercado",
                                text: "O atendimento da VFPD é excepcional. As bobinas térmicas chegaram antes do prazo e a qualidade é muito superior ao que vínhamos usando.",
                                initials: "RS"
                            },
                            {
                                name: "Maura Oliveira",
                                role: "Dona de Papelaria",
                                text: "Fiquei encantada com a organização e o profissionalismo. As caixas de papelão são resistentes e o preço é justo. Recomendo para todos os lojistas.",
                                initials: "MO"
                            },
                            {
                                name: "Claudio Mendes",
                                role: "Gestor Logístico",
                                text: "Encontrar um fornecedor que entende a urgência do varejo é raro. A VFPD se tornou nossa parceira principal em menos de um mês.",
                                initials: "CM"
                            }
                        ].map((testimonial, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="h-full bg-gray-50 p-10 rounded-[40px] border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col">
                                    <div className="absolute top-8 right-10 text-[#a65d37]/10 group-hover:text-[#a65d37]/20 transition-colors">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C20.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H5.017V21H6.017Z" />
                                        </svg>
                                    </div>

                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-4 h-4 fill-[#a65d37] text-[#a65d37]" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 italic text-lg mb-8 leading-relaxed relative z-10">
                                        "{testimonial.text}"
                                    </p>

                                    <div className="flex items-center gap-4 border-t border-gray-200 pt-8 mt-auto">
                                        <div className="w-14 h-14 bg-[#a65d37] rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#a65d37]/20 flex-shrink-0">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 uppercase tracking-tight">{testimonial.name}</h4>
                                            <p className="text-sm text-[#a65d37] font-bold uppercase tracking-widest">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contato" className="py-24 bg-gray-50/50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <Reveal duration={0.8} y={40}>
                        <div className="bg-white rounded-[3rem] p-12 md:p-20 text-gray-900 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-xl border border-gray-100">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-5xl font-black mb-6 text-gray-900">Pronto para impulsionar seu negócio?</h2>
                                <p className="text-gray-600 text-xl mb-10 leading-relaxed">
                                    Fale agora com um de nossos especialistas e solicite um orçamento personalizado para grandes volumes.
                                </p>
                                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                    <Link href="/contato">
                                        <Button className="bg-primary hover:bg-primary/90 text-white text-xl px-10 py-8 rounded-2xl h-auto shadow-lg shadow-primary/20">
                                            Fale com um Especialista
                                        </Button>
                                    </Link>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">E-mail Comercial</span>
                                        <span className="text-2xl font-bold text-primary">vendas@vfpd.com.br</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block">
                                <AnimatedImage
                                    src="/images/img/img-2.png"
                                    alt="Logística de Embalagens VFPD"
                                    className="w-[400px] h-[300px] object-cover rounded-3xl shadow-2xl"
                                    containerClassName="w-[400px] h-[300px]"
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
