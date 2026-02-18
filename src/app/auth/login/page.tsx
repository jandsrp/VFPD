"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            toast.error("Credenciais inválidas. Tente novamente.");
            setIsLoading(false);
        } else {
            toast.success("Login realizado com sucesso!");
            router.push(callbackUrl);
            router.refresh();
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 px-4">
            <Card className="w-full max-w-md border-none shadow-xl rounded-3xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-black text-gray-900">Entrar</CardTitle>
                    <CardDescription className="text-gray-500">
                        Bem-vindo de volta! Faça login para continuar.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" name="email" type="email" placeholder="example@gmail.com" required className="rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" name="password" type="password" required className="rounded-xl h-12" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>
                        <p className="text-sm text-gray-500 text-center">
                            Ainda não tem uma conta?{" "}
                            <Link href="/auth/register" className="text-primary font-bold hover:underline">
                                Cadastre-se aqui
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
