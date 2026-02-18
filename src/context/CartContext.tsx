"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: number;
    nome: string;
    preco: number;
    price?: number;
    quantity: number;
    url_imagem?: string;
    images?: string[];
    categoria?: string;
    description?: string;
    descricao?: string;
    color?: string;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: number, color?: string, size?: string) => void;
    updateQuantity: (productId: number, delta: number, color?: string, size?: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('vfpd-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Erro ao carregar carrinho:", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever cart changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('vfpd-cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (product: any) => {
        // Normalize product data to match CartItem interface
        const normalizedProduct: CartItem = {
            id: product.id,
            nome: product.nome || product.name,
            preco: product.preco || product.price,
            price: product.price || product.preco,
            categoria: product.categoria || product.category,
            description: product.description || product.descricao,
            descricao: product.descricao || product.description,
            images: product.images,
            url_imagem: product.url_imagem,
            color: product.color,
            size: product.size,
            quantity: product.quantity || product.quantidade || 1
        };

        setCart(prevCart => {
            const existingItem = prevCart.find(item =>
                item.id === normalizedProduct.id &&
                item.color === normalizedProduct.color &&
                item.size === normalizedProduct.size
            );

            if (existingItem) {
                return prevCart.map(item =>
                    (item.id === normalizedProduct.id && item.color === normalizedProduct.color && item.size === normalizedProduct.size)
                        ? { ...item, quantity: item.quantity + normalizedProduct.quantity }
                        : item
                );
            }
            return [...prevCart, normalizedProduct];
        });
    };

    const removeFromCart = (productId: number, color?: string, size?: string) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === productId && item.color === color && item.size === size)
        ));
    };

    const updateQuantity = (productId: number, delta: number, color?: string, size?: string) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId && item.color === color && item.size === size) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => {
        const price = item.price || item.preco || 0;
        return acc + Number(price) * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return context;
};
