"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function submitOrderAction(formData: {
    nome: string;
    email: string;
    telefone: string;
    observacoes?: string;
}, cartItems: any[], totalPrice: number) {
    try {
        // 1. Inserir o pedido principal
        const [newOrder] = await db.insert(orders).values({
            customerName: formData.nome,
            customerEmail: formData.email,
            customerPhone: formData.telefone,
            total: totalPrice.toString(),
            notes: formData.observacoes || "",
            status: "Pendente",
        }).returning();

        // 2. Inserir os itens do pedido
        const itemsToInsert = cartItems.map((item) => ({
            orderId: newOrder.id,
            productId: item.id, // Assumindo que o item.id é o ID do produto no Postgres
            quantity: item.quantity,
            priceAtTime: (item.price || item.preco).toString(),
        }));

        await db.insert(orderItems).values(itemsToInsert);

        revalidatePath("/admin/pedidos"); // Exemplo de revalidação para uma futura área admin

        return { success: true, orderId: newOrder.id };
    } catch (error) {
        console.error("Erro ao submeter pedido:", error);
        return { success: false, error: "Falha ao processar o pedido. Tente novamente." };
    }
}
