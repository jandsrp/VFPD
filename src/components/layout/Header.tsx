"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, Menu, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const Header = () => {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const isAdmin = (session?.user as any)?.role === "admin";

    const navItems = [
        { label: 'Início', path: '/' },
        { label: 'Loja', path: '/produtos' },
        { label: 'Sobre', path: '/sobre-nos' },
        { label: 'Contato', path: '/contato' },
    ];

    if (isAdmin) {
        navItems.push({ label: 'Admin', path: '/admin' });
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary transition-all">
                        V
                    </div>
                    <span className="font-bold text-2xl text-gray-900 tracking-tight hidden sm:block">
                        VFPD<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.path}
                            className={`text-base font-bold transition-colors duration-300 hover:text-primary relative group ${pathname === item.path ? 'text-primary' : 'text-gray-500'
                                }`}
                        >
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    <Link href="/carrinho">
                        <Button variant="ghost" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
                            <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
                            {totalItems > 0 && (
                                <Badge className="absolute -top-1 -right-1 bg-primary text-white border-2 border-white px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center animate-fade-in font-bold">
                                    {totalItems}
                                </Badge>
                            )}
                        </Button>
                    </Link>

                    {session ? (
                        <div className="flex items-center gap-2">
                            {isAdmin && (
                                <div className="hidden sm:flex items-center bg-[#f4e4d4] text-[#a65d37] px-4 py-1.5 rounded-full font-black text-xs tracking-widest shadow-sm border border-[#e8d5c4] animate-fade-in translate-y-[-1px]">
                                    MASTER
                                </div>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border border-gray-200">
                                            <User className="w-5 h-5" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-none animate-in fade-in zoom-in-95 duration-200 bg-white/95 backdrop-blur-sm">
                                    <DropdownMenuLabel className="font-bold text-gray-900 px-3 py-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Minha Conta
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-gray-100" />
                                    <div className="px-3 py-3">
                                        <p className="text-sm font-black text-gray-900">{session.user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                        {isAdmin && (
                                            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black bg-[#f4e4d4] text-[#a65d37] px-2.5 py-1 rounded-lg w-fit border border-[#e8d5c4]">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                MASTER ADMIN
                                            </div>
                                        )}
                                    </div>
                                    <DropdownMenuSeparator className="bg-gray-100" />
                                    {isAdmin && (
                                        <Link href="/admin">
                                            <DropdownMenuItem className="rounded-xl cursor-pointer gap-2 focus:bg-[#f4f4f4] py-2.5 font-bold text-gray-700">
                                                <ShieldCheck className="w-4 h-4 text-[#a65d37]" />
                                                Painel Administrativo
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                    <DropdownMenuItem
                                        className="rounded-xl cursor-pointer gap-2 text-red-500 focus:text-red-500 focus:bg-red-50 py-2.5 font-bold"
                                        onClick={() => signOut()}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sair da Conta
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <User className="w-6 h-6 text-gray-700" />
                            </Button>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-slide-up">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className={`text-lg font-medium ${pathname === item.path ? 'text-primary' : 'text-gray-700'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
