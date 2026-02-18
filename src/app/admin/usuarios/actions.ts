"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getUsers() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
        throw new Error("Não autorizado");
    }

    return await db.query.users.findMany({
        orderBy: (users, { desc }) => [desc(users.id)],
    });
}

export async function updateUserRole(userId: string, role: "admin" | "customer") {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
        throw new Error("Não autorizado");
    }

    // Prevent de-promoting yourself
    if (userId === (session.user as any)?.id) {
        throw new Error("Você não pode alterar sua própria função.");
    }

    await db.update(users)
        .set({ role })
        .where(eq(users.id, userId));

    revalidatePath("/admin");
    return { success: true };
}

export async function deleteUser(userId: string) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
        throw new Error("Não autorizado");
    }

    if (userId === (session.user as any)?.id) {
        throw new Error("Você não pode excluir sua própria conta.");
    }

    await db.delete(users).where(eq(users.id, userId));

    revalidatePath("/admin");
    return { success: true };
}
