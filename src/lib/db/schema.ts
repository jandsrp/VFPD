import { pgTable, serial, text, decimal, integer, timestamp, primaryKey, boolean } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

// --- AUTH TABLES ---

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password"), // For Credentials provider
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    phone: text("phone"),
    role: text("role", { enum: ["admin", "customer"] }).default("customer").notNull(),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

// --- PRODUCT TABLES ---

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").notNull().default(0),
    category: text("category").notNull(),
    // Store images, colors, and sizes as text arrays
    images: text("images").array().notNull().default([]),
    colors: text("colors").array().notNull().default([]),
    sizes: text("sizes").array().notNull().default([]),
    isFeatured: boolean("is_featured").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: text("userId").references(() => users.id), // Link to user
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    status: text("status").notNull().default("Pendente"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => orders.id).notNull(),
    productId: integer("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    priceAtTime: decimal("price_at_time", { precision: 10, scale: 2 }).notNull(),
});

export const attributes = pgTable("attributes", {
    id: serial("id").primaryKey(),
    type: text("type", { enum: ["color", "size", "category"] }).notNull(),
    name: text("name").notNull(),
    value: text("value"), // Hex code for colors
    createdAt: timestamp("created_at").defaultNow(),
});
