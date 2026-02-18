import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { getProduct } from '@/app/admin/produtos/actions';
import { notFound } from 'next/navigation';

import { getAttributes } from '@/app/admin/atributos/actions';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [product, colors, sizes, categories] = await Promise.all([
        getProduct(Number(id)),
        getAttributes('color'),
        getAttributes('size'),
        getAttributes('category')
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900">Editar Produto</h1>
                <p className="text-gray-500">Atualize as informações do seu produto.</p>
            </div>

            <ProductForm
                initialData={product}
                availableColors={colors}
                availableSizes={sizes}
                availableCategories={categories}
            />
        </div>
    );
}
