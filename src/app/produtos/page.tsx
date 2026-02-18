import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { getProducts } from '@/app/admin/produtos/actions';
import { getAttributes } from '@/app/admin/atributos/actions';
import ProductListing from '@/components/products/ProductListing';

export const revalidate = 3600; // revalidate every hour

export default async function ProductsPage() {
    const [products, categoryAttributes] = await Promise.all([
        getProducts(),
        getAttributes("category")
    ]);

    const categories = categoryAttributes.map(attr => attr.name);

    return (
        <section id="produtos" className="py-24 bg-gray-50/50 min-h-screen">
            <div className="container mx-auto px-4 max-w-7xl">
                <Reveal>
                    <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Nossos Produtos</h3>
                </Reveal>
                <ProductListing
                    products={products as any}
                    categories={categories}
                />
            </div>
        </section>
    );
}
