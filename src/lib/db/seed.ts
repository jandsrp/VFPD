import * as dotenv from "dotenv";
dotenv.config();

// Agora importamos o db e schema após o carregamento do ambiente
import { db } from "./index";
import { products } from "./schema";
import { INITIAL_PRODUCTS } from "../seed-data";

async function seed() {
    console.log("🌱 Iniciando seed do banco de dados...");

    try {
        // Limpar tabela se necessário (opcional)
        // await db.delete(products);

        // Inserir produtos iniciais
        for (const prod of INITIAL_PRODUCTS) {
            console.log(`Inserindo: ${prod.nome}`);
            await db.insert(products).values({
                name: prod.nome,
                description: prod.descricao,
                price: prod.preco.toString(),
                stock: prod.estoque,
                category: prod.categoria,
                images: [prod.url_imagem],
            });
        }

        console.log("✅ Seed concluído com sucesso!");
    } catch (error) {
        console.error("❌ Erro durante o seed:", error);
        process.exit(1);
    }
}

seed();
