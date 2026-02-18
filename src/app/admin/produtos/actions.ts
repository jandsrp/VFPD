"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: {
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    images: string[];
    colors: string[];
    sizes: string[];
    isFeatured: boolean;
}) {
    try {
        await db.insert(products).values({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            stock: formData.stock,
            category: formData.category,
            images: formData.images,
            colors: formData.colors,
            sizes: formData.sizes,
            isFeatured: formData.isFeatured,
        });

        revalidatePath("/produtos");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error creating product:", error);
        return { error: "Erro ao criar produto." };
    }
}

export async function updateProduct(id: number, formData: {
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    images: string[];
    colors: string[];
    sizes: string[];
    isFeatured: boolean;
}) {
    try {
        await db.update(products)
            .set({
                name: formData.name,
                description: formData.description,
                price: formData.price,
                stock: formData.stock,
                category: formData.category,
                images: formData.images,
                colors: formData.colors,
                sizes: formData.sizes,
                isFeatured: formData.isFeatured,
                updatedAt: new Date(),
            })
            .where(eq(products.id, id));

        revalidatePath("/produtos");
        revalidatePath(`/produtos/${id}`);
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { error: "Erro ao atualizar produto." };
    }
}

export async function deleteProduct(id: number) {
    try {
        await db.delete(products).where(eq(products.id, id));
        revalidatePath("/produtos");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { error: "Erro ao excluir produto." };
    }
}

export async function getProducts() {
    return await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
}

export async function getProduct(id: number) {
    return await db.query.products.findFirst({
        where: eq(products.id, id),
    });
}
