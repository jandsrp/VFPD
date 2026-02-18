"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct } from '@/app/admin/produtos/actions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
        async function loadProduct() {
            const data = await getProduct(Number(id));
            if (!data) {
                router.push("/produtos");
                return;
            }
            setProduct(data);
            setIsLoading(false);

            // Auto-select first options if available
            if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
            if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        }
        loadProduct();
    }, [id, router]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#fcfaf8]"><div className="w-10 h-10 border-4 border-[#a65d37] border-t-transparent rounded-full animate-spin"></div></div>;
    }

    const handleAddToCart = () => {
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error("Por favor, selecione uma cor.");
            return;
        }
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error("Por favor, selecione um tamanho.");
            return;
        }

        addToCart({
            ...product,
            quantidade: quantity,
            color: selectedColor,
            size: selectedSize
        });
        toast.success(`${product.name} adicionado ao carrinho!`);
    };

    // Helper to get hex code for color name (mock implementation, expand as needed)
    const getColorHex = (name: string) => {
        const colors: Record<string, string> = {
            'Branco': '#FFFFFF',
            'Cru': '#f5f5dc',
            'Preto': '#000000',
            'Verde': '#2d5a27',
            'Vermelho': '#8b0000',
            'Azul': '#00008b',
            'Amarelo': '#ffd700',
            'Cinza': '#808080'
        };
        return colors[name] || '#e5e7eb';
    };

    return (
        <div className="min-h-screen bg-[#fcfaf8]">
            <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl">
                <Reveal>
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-[#a65d37] mb-10 transition-colors font-bold group">
                        <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span className="uppercase text-xs tracking-widest">Voltar para Loja</span>
                    </button>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <Reveal>
                        <div className="space-y-6 sticky top-24">
                            <div className="aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white relative group">
                                <img
                                    src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {product.isFeatured && (
                                    <div className="absolute top-6 left-6 bg-[#a65d37] text-white text-xs font-black px-4 py-2 rounded-full shadow-lg tracking-widest uppercase">
                                        Destaque
                                    </div>
                                )}
                            </div>
                            {product.images.length > 1 && (
                                <div className="flex justify-center gap-4">
                                    {product.images.map((img: string, idx: number) => (
                                        <button
                                            key={`${img}-${idx}`}
                                            onClick={() => setSelectedImage(idx)}
                                            className={cn(
                                                "w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                                selectedImage === idx
                                                    ? "border-[#a65d37] shadow-lg scale-105 translateY(-2px)"
                                                    : "border-transparent opacity-60 hover:opacity-100 bg-white"
                                            )}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>

                    {/* Product Info */}
                    <Reveal delay={0.2}>
                        <div className="flex flex-col h-full pt-4">
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Badge className="bg-[#f4e4d4] text-[#a65d37] hover:bg-[#a65d37] hover:text-white border-none px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors">
                                        {product.category}
                                    </Badge>
                                    {product.stock > 0 ? (
                                        <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Em Estoque
                                        </span>
                                    ) : (
                                        <span className="text-red-500 font-bold text-xs uppercase tracking-widest">Esgotado</span>
                                    )}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">{product.name}</h1>
                                <div className="text-4xl font-black text-[#a65d37]">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                                </div>
                            </div>

                            <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed font-medium">
                                <p>{product.description}</p>
                            </div>

                            <div className="space-y-8 mb-10 border-t border-b border-gray-100 py-8">
                                {/* Color Selector */}
                                {product.colors && product.colors.length > 0 && (
                                    <div className="space-y-4">
                                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest block">Cor Selecionada: <span className="text-[#a65d37]">{selectedColor}</span></span>
                                        <div className="flex flex-wrap gap-3">
                                            {product.colors.map((color: string) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all border-2 relative group",
                                                        selectedColor === color
                                                            ? "border-[#a65d37] scale-110"
                                                            : "border-transparent hover:scale-110"
                                                    )}
                                                    style={{ backgroundColor: getColorHex(color) }}
                                                    title={color}
                                                >
                                                    {selectedColor === color && (
                                                        <Check className={cn("w-4 h-4", getColorHex(color) === '#FFFFFF' || getColorHex(color) === '#f5f5dc' ? "text-gray-900" : "text-white")} />
                                                    )}
                                                    <span className="sr-only">{color}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Selector */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="space-y-4">
                                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest block">Tamanho: <span className="text-[#a65d37]">{selectedSize}</span></span>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size: string) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl border-2 font-bold flex items-center justify-center transition-all",
                                                        selectedSize === size
                                                            ? "border-[#a65d37] bg-[#a65d37] text-white shadow-lg shadow-[#a65d37]/20"
                                                            : "border-gray-200 text-gray-500 hover:border-[#a65d37] hover:text-[#a65d37]"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="rounded-xl hover:bg-gray-50 text-gray-500 h-10 w-10"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="rounded-xl hover:bg-gray-50 text-gray-500 h-10 w-10"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full bg-gray-900 hover:bg-[#a65d37] text-white font-black py-8 rounded-[24px] transition-all duration-300 gap-4 text-lg shadow-xl shadow-gray-900/10 hover:shadow-[#a65d37]/30 hover:-translate-y-1"
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    ADICIONAR AO CARRINHO
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
