import React from 'react';
import { getProducts, deleteProduct } from '@/app/admin/produtos/actions';
import { getUsers, updateUserRole, deleteUser } from '@/app/admin/usuarios/actions';
import { getOrders } from '@/app/admin/pedidos/actions';
import { getAttributes } from '@/app/admin/atributos/actions';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, UserPlus, ShieldAlert, ShoppingCart, Tag, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromoteUserButton } from '@/components/admin/PromoteUserButton';
import { OrdersTab } from '@/components/admin/OrdersTab';
import { AttributesTab } from '@/components/admin/AttributesTab';

export default async function AdminDashboard() {
    const [products, usersList, orders, colors, sizes, categories] = await Promise.all([
        getProducts(),
        getUsers(),
        getOrders(),
        getAttributes('color'),
        getAttributes('size'),
        getAttributes('category')
    ]);

    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Painel Administrativo</h1>
                    <p className="text-gray-500 mt-2 text-lg">Gerencie sua loja e catálogo de produtos com excelência.</p>
                </div>
            </div>

            <Tabs defaultValue="produtos">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <TabsList>
                        <TabsTrigger value="produtos" className="gap-2">
                            Produtos
                        </TabsTrigger>
                        <TabsTrigger value="pedidos" className="gap-2">
                            Pedidos
                        </TabsTrigger>
                        <TabsTrigger value="atributos" className="gap-2">
                            Atributos
                        </TabsTrigger>
                        <TabsTrigger value="usuarios" className="gap-2">
                            Usuários
                        </TabsTrigger>
                    </TabsList>

                    <Link href="/admin/produtos/novo">
                        <Button className="bg-[#a65d37] hover:bg-[#8e4f2f] text-white font-black h-14 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-[#a65d37]/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all text-lg">
                            <Plus className="w-6 h-6" />
                            Novo Produto
                        </Button>
                    </Link>
                </div>

                <TabsContent value="produtos">
                    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#fcfaf8] text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-6">Produto</th>
                                        <th className="px-8 py-6">Categoria</th>
                                        <th className="px-8 py-6">Preço</th>
                                        <th className="px-8 py-6 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0 shadow-sm">
                                                        <img
                                                            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <span className="font-black text-gray-900 text-lg uppercase tracking-tight">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-bold text-gray-400 text-xs tracking-widest uppercase">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-black text-[#a65d37] text-lg">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link href={`/admin/produtos/${product.id}/editar`}>
                                                        <Button variant="ghost" size="icon" className="w-11 h-11 text-gray-400 hover:text-[#a65d37] hover:bg-[#f4e4d4]/50 rounded-xl transition-all">
                                                            <Edit2 className="w-5 h-5" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" className="w-11 h-11 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                        <Trash2 className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-32 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                                        <Tag className="w-10 h-10 text-gray-200" />
                                                    </div>
                                                    <p className="text-gray-400 font-bold text-lg">Nenhum produto cadastrado ainda.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="usuarios">
                    <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#fcfaf8] text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-6">Usuário</th>
                                        <th className="px-8 py-6">E-mail</th>
                                        <th className="px-8 py-6">Função</th>
                                        <th className="px-8 py-6 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {usersList.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 border border-gray-100 uppercase">
                                                        {user.name?.[0] || '?'}
                                                    </div>
                                                    <span className="font-black text-gray-900 uppercase tracking-tight">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-gray-500 font-medium">
                                                {user.email}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${user.role === 'admin'
                                                    ? 'bg-[#f4e4d4] text-[#a65d37] border border-[#e8d5c4]'
                                                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                                                    }`}>
                                                    {user.role}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {user.role === 'customer' && (
                                                    <PromoteUserButton userId={user.id} />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="pedidos">
                    <OrdersTab orders={orders} />
                </TabsContent>

                <TabsContent value="atributos">
                    <AttributesTab colors={colors} sizes={sizes} categories={categories} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
