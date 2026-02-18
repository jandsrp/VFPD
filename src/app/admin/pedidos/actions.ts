"use server";

import { db } from "@/lib/db";
import { orders, orderItems, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    try {
        const result = await db
            .select({
                id: orders.id,
                customerName: orders.customerName,
                customerEmail: orders.customerEmail,
                total: orders.total,
                status: orders.status,
                createdAt: orders.createdAt,
                user: {
                    name: users.name,
                    email: users.email,
                    image: users.image,
                }
            })
            .from(orders)
            .leftJoin(users, eq(orders.userId, users.id))
            .orderBy(desc(orders.createdAt));

        return result;
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return [];
    }
}

export async function updateOrderStatus(orderId: number, status: string) {
    try {
        await db.update(orders)
            .set({ status })
            .where(eq(orders.id, orderId));

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar status do pedido:", error);
        return { error: "Erro ao atualizar status." };
    }
}
