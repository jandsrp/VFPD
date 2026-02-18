"use client";

import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface AddToCartButtonProps {
    product: any;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({ ...product, quantity });
        toast.success(`${product.name} adicionado ao carrinho!`, {
            description: `${quantity} unidade(s) adicionadas com sucesso.`,
        });
        setQuantity(1); // Reset quantity after adding
    };

    const handleQuantityChange = (delta: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between bg-gray-50 p-1 rounded-xl border border-gray-100">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-white rounded-lg transition-colors"
                    onClick={(e) => handleQuantityChange(-1, e)}
                >
                    <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold text-gray-900">{quantity}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-white rounded-lg transition-colors"
                    onClick={(e) => handleQuantityChange(1, e)}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <Button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 hover:bg-primary text-white font-bold py-6 rounded-2xl transition-all duration-300 gap-2 group/btn"
            >
                <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" />
                Adicionar
            </Button>
        </div>
    );
}
