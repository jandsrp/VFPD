import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                V
                            </div>
                            <span className="font-bold text-2xl tracking-tight">VFPD Comercial</span>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Sua parceira estratégica em embalagens e artigos de papelaria. Qualidade, confiança e o compromisso de que você faz parte da nossa história.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6 text-secondary">Navegação</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Página Inicial</Link></li>
                            <li><Link href="/produtos" className="text-gray-400 hover:text-white transition-colors">Produtos</Link></li>
                            <li><Link href="/sobre-nos" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl font-bold mb-6 text-secondary">Contato</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>vendas@vfpd.com.br</li>
                            <li>(XX) 9XXXX-XXXX</li>
                            <li>Rua Exemplo, 123 - Cidade, Estado</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} VFPD Comercial e Bazar LTDA. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};
