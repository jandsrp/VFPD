"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, CheckCircle, Clock } from 'lucide-react';
import { updateOrderStatus } from '@/app/admin/pedidos/actions';
import { toast } from 'sonner';

interface Order {
    id: number;
    customerName: string;
    customerEmail: string;
    total: string;
    status: string;
    createdAt: Date | null;
    user: {
        name: string | null;
        email: string | null;
        image: string | null;
    } | null;
}

interface OrdersTabProps {
    orders: Order[];
}

const statusColors: Record<string, string> = {
    'Pendente': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Pago': 'bg-blue-100 text-blue-700 border-blue-200',
    'Enviado': 'bg-purple-100 text-purple-700 border-purple-200',
    'Concluído': 'bg-green-100 text-green-700 border-green-200',
    'Cancelado': 'bg-red-100 text-red-700 border-red-200',
};

const statusIcons: Record<string, React.ReactNode> = {
    'Pendente': <Clock className="w-3 h-3" />,
    'Pago': <CheckCircle className="w-3 h-3" />,
    'Enviado': <Package className="w-3 h-3" />,
    'Concluído': <CheckCircle className="w-3 h-3" />,
};

export function OrdersTab({ orders }: OrdersTabProps) {
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        setUpdatingId(orderId);
        const result = await updateOrderStatus(orderId, newStatus);
        setUpdatingId(null);

        if (result.success) {
            toast.success(`Pedido #${orderId} atualizado para ${newStatus}`);
        } else {
            toast.error("Erro ao atualizar pedido");
        }
    };

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-[32px] p-20 text-center border-2 border-dashed border-gray-100">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-[#fcfaf8] rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-[#a65d37]/20" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Nenhum Pedido</h3>
                        <p className="text-gray-400 mt-2 max-w-sm mx-auto">
                            Os pedidos realizados aparecerão aqui.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#fcfaf8] text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
                        <tr>
                            <th className="px-8 py-6">Pedido</th>
                            <th className="px-8 py-6">Cliente</th>
                            <th className="px-8 py-6">Data</th>
                            <th className="px-8 py-6">Total</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <span className="font-black text-gray-900">#{order.id}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900">{order.customerName}</span>
                                        <span className="text-xs text-gray-400">{order.customerEmail}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-gray-500 font-medium text-sm">
                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('pt-BR') : '-'}
                                </td>
                                <td className="px-8 py-6 font-black text-[#a65d37]">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(order.total))}
                                </td>
                                <td className="px-8 py-6">
                                    <Badge className={`gap-1.5 py-1 px-3 ${statusColors[order.status] || 'bg-gray-100 text-gray-500'}`}>
                                        {statusIcons[order.status]}
                                        <span className="uppercase tracking-wider text-[10px] font-black">{order.status}</span>
                                    </Badge>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        {order.status !== 'Enviado' && order.status !== 'Concluído' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={updatingId === order.id}
                                                onClick={() => handleStatusUpdate(order.id, 'Enviado')}
                                                className="h-8 text-[10px] font-bold uppercase tracking-wider"
                                            >
                                                Marcar Enviado
                                            </Button>
                                        )}
                                        {order.status === 'Enviado' && (
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700 text-white h-8 text-[10px] font-bold uppercase tracking-wider"
                                                disabled={updatingId === order.id}
                                                onClick={() => handleStatusUpdate(order.id, 'Concluído')}
                                            >
                                                Concluir
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
