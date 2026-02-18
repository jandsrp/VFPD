"use client";

import React, { useState, useMemo } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedImage } from '@/components/ui/AnimatedImage';
import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    category: string;
    images: string[];
}

interface ProductListingProps {
    products: Product[];
    categories: string[];
}

export default function ProductListing({ products, categories }: ProductListingProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="space-y-12">
            {/* Search and Filter Controls */}
            <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-3 items-center bg-white p-4 md:p-5 rounded-[32px] shadow-sm border border-gray-100 mb-12">
                    {/* Category Filter */}
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all ${!selectedCategory
                                ? 'bg-[#a65d37] text-white shadow-lg shadow-[#a65d37]/20 border border-[#a65d37]'
                                : 'bg-gray-50 text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-wider ${selectedCategory === category
                                    ? 'bg-[#a65d37] text-white shadow-lg shadow-[#a65d37]/20 border border-[#a65d37]'
                                    : 'bg-gray-50 text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}

                    {/* Compact Search Input */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-64 lg:w-80 group ml-auto md:ml-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#a65d37] transition-colors" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 group-focus-within:bg-white rounded-xl border border-transparent group-focus-within:border-[#a65d37]/20 outline-none transition-all text-[11px] text-gray-900 font-medium h-[40px]"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3 text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
            </Reveal>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, idx) => (
                    <Reveal key={product.id} delay={idx * 0.05}>
                        <Link href={`/produtos/${product.id}`}>
                            <Card className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl h-full cursor-pointer flex flex-col">
                                <CardHeader className="p-0 relative h-64 overflow-hidden">
                                    <AnimatedImage
                                        src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'}
                                        alt={product.name}
                                        containerClassName="w-full h-full"
                                        className="transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm text-[#a65d37] border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest z-10">
                                        {product.category}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="p-6 flex-grow">
                                    <CardTitle className="text-xl font-black text-gray-900 mb-2 truncate uppercase tracking-tight">
                                        {product.name}
                                    </CardTitle>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10 font-medium">
                                        {product.description}
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <div className="text-2xl font-black text-[#a65d37]">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                                        </div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                            Em estoque: {product.stock}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <AddToCartButton product={product as any} />
                                </CardFooter>
                            </Card>
                        </Link>
                    </Reveal>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Ops! Nenhum produto encontrado</h3>
                        <p className="text-gray-500 font-medium">Tente ajustar sua busca ou filtro.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                            className="mt-6 text-[#a65d37] font-black hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
