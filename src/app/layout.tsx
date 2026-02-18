import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "VFPD Comercial e Bazar LTDA",
    description: "Embalagens e Papelaria que Impulsionam seu Negócio",
};

import { AuthProvider } from "@/components/providers/AuthProvider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
                <NextSSRPlugin
                    /**
                     * The `extractRouterConfig` will extract the routerConfig from the
                     * `ourFileRouter` that you exported from your `core.ts` file.
                     */
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <AuthProvider>
                    <CartProvider>
                        <Header />
                        <main className="flex-grow pt-20">
                            {children}
                        </main>
                        <Footer />
                        <Toaster />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
