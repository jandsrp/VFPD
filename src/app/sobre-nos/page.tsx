"use client";

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
    const values = [
        { icon: Target, title: "Missão", desc: "Fornecer soluções de embalagens e papelaria que agreguem valor e eficiência aos nossos clientes." },
        { icon: Eye, title: "Visão", desc: "Ser referência nacional em distribuição de embalagens, reconhecida pela inovação e excelência." },
        { icon: Heart, title: "Paixão", desc: "Movemo-nos pelo desafio de superar expectativas e entregar o melhor em cada detalhe." },
        { icon: ShieldCheck, title: "Ética", desc: "Transparência e integridade em todas as nossas relações comerciais e parcerias." }
    ];

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover brightness-50"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Reveal>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Sobre Nós</h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium">
                            Construindo o futuro das embalagens com compromisso e inovação.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <Reveal>
                                <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Nossa História</span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Uma trajetória de confiança e crescimento</h2>
                                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        A VFPD Comercial e Bazar LTDA nasceu do desejo de transformar o mercado de distribuição de embalagens e artigos de papelaria. Com anos de experiência no setor, identificamos a necessidade de uma empresa que unisse agilidade, qualidade e um atendimento verdadeiramente humano.
                                    </p>
                                    <p>
                                        Hoje, somos orgulhosamente um dos principais parceiros de diversos negócios, desde pequenos empreendedores até grandes indústrias, fornecendo não apenas produtos, mas soluções logísticas que fazem a diferença na ponta final.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                        <div className="md:w-1/2">
                            <AnimatedImage
                                src="/images/img/img-3.png"
                                alt="Nossa História e Logística"
                                className="rounded-[2.5rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <Reveal>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-gray-900 mb-4">O que nos move</h2>
                            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Nossos pilares fundamentais que guiam cada decisão e entrega.</p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100 flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <v.icon className="w-10 h-10 text-primary group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{v.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{v.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
