import React from 'react';
import ProductForm from '@/components/admin/ProductForm';

import { getAttributes } from '@/app/admin/atributos/actions';

export default async function NewProductPage() {
    const [colors, sizes, categories] = await Promise.all([
        getAttributes('color'),
        getAttributes('size'),
        getAttributes('category')
    ]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900">Novo Produto</h1>
                <p className="text-gray-500">Cadastre um novo item no seu catálogo.</p>
            </div>

            <ProductForm availableColors={colors} availableSizes={sizes} availableCategories={categories} />
        </div>
    );
}
