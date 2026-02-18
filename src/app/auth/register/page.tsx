"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { registerUser } from './actions';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const router = useRouter();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        // Apply mask: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d{0,2}).*/, '($1');
        }

        setPhone(value);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        // Ensure the masked phone is sent correctly if needed, or send as is
        const result = await registerUser(formData);

        if (result.error) {
            toast.error(result.error);
            setIsLoading(false);
        } else {
            toast.success("Conta criada com sucesso!");
            router.push("/auth/login");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-10">
            <Card className="w-full max-w-md border-none shadow-xl rounded-3xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-black text-gray-900">Criar Conta</CardTitle>
                    <CardDescription className="text-gray-500">
                        Preencha os dados abaixo para se cadastrar.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" name="name" placeholder="João Silva" required className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" name="email" type="email" placeholder="exemplo@vfpd.com.br" required className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone / WhatsApp</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="(11) 99999-9999"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                                className="rounded-xl h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" name="password" type="password" required className="rounded-xl h-12" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 transition-all font-inter"
                            disabled={isLoading}
                        >
                            {isLoading ? "Criando conta..." : "Registrar"}
                        </Button>
                        <p className="text-sm text-gray-500 text-center">
                            Já tem uma conta?{" "}
                            <Link href="/auth/login" className="text-primary font-bold hover:underline">
                                Entre aqui
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
