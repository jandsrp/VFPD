"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password || !phone) {
        return { error: "Todos os campos são obrigatórios." };
    }

    try {
        // Check if user exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            return { error: "Este e-mail já está cadastrado." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            id: nanoid(),
            name,
            email,
            phone,
            password: hashedPassword,
            role: "customer", // Default role
        });

        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Ocorreu um erro ao criar a conta." };
    }
}
