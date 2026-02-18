"use server";

import { db } from "@/lib/db";
import { attributes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAttributes(type: "color" | "size" | "category") {
    try {
        return await db.query.attributes.findMany({
            where: eq(attributes.type, type),
        });
    } catch (error) {
        console.error(`Erro ao buscar atributos (${type}):`, error);
        return [];
    }
}

export async function createAttribute(data: {
    type: "color" | "size" | "category";
    name: string;
    value?: string;
}) {
    try {
        await db.insert(attributes).values({
            type: data.type,
            name: data.name,
            value: data.value,
        });

        revalidatePath("/admin");
        // Also revalidate Product Form if needed (it fetches these)
        revalidatePath("/admin/produtos/novo");
        return { success: true };
    } catch (error) {
        console.error("Erro ao criar atributo:", error);
        return { error: "Erro ao criar atributo." };
    }
}

export async function deleteAttribute(id: number) {
    try {
        await db.delete(attributes).where(eq(attributes.id, id));
        revalidatePath("/admin");
        revalidatePath("/admin/produtos/novo");
        return { success: true };
    } catch (error) {
        console.error("Erro ao excluir atributo:", error);
        return { error: "Erro ao excluir atributo." };
    }
}
