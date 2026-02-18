"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: "Embalagens que Protegem sua Marca",
        description: "Bobinas Kraft de alta resistência e durabilidade. O cuidado que seu produto merece.",
        image: "/images/slider/slider-1.png",
        cta: "Ver Bobinas",
        link: "/produtos",
        color: "primary"
    },
    {
        id: 2,
        title: "Proteção Extra para Seus Envios",
        description: "Estoque completo de plástico bolha, fitas e papelão. A segurança que seu produto precisa, pronta para entrega.",
        image: "/images/slider/slider-2.png",
        cta: "Ver Proteção",
        link: "/produtos",
        color: "secondary"
    },
    {
        id: 3,
        title: "Logística Inteligente e Ágil",
        description: "Sua parceira em suprimentos para embalagem. Entrega rápida em todo o Brasil.",
        image: "/images/slider/slider-3.png",
        cta: "Falar com Consultor",
        link: "/#contato",
        color: "primary"
    }
];

export const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Zoom Overlay */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[current].image}
                            alt={slides[current].title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
                    </motion.div>

                    {/* Content */}
                    <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <span className="inline-block px-4 py-1 rounded-full bg-primary/30 text-white border border-primary/40 text-sm font-bold mb-6 backdrop-blur-sm shadow-xl">
                                    Líder em Embalagens desde 1995
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                                    {slides[current].title.split(' ').map((word, i) => (
                                        <span key={i} className={i === 2 || i === 3 ? "text-secondary italic" : ""}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed font-medium">
                                    {slides[current].description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={slides[current].link}>
                                        <Button size="lg" className="btn-primary text-xl px-10 py-7 w-full sm:w-auto">
                                            {slides[current].cta} <ArrowRight className="ml-2 w-6 h-6" />
                                        </Button>
                                    </Link>
                                    <Link href="#contato">
                                        <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 text-xl px-10 py-7 w-full sm:w-auto">
                                            Solicitar Orçamento
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="rounded-full border-white/20 text-white hover:bg-white/10 w-12 h-12"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="rounded-full border-white/20 text-white hover:bg-white/10 w-12 h-12"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${current === i ? "w-8 bg-secondary" : "w-3 bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
