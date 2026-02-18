"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Palette, Ruler, Tag } from 'lucide-react';
import { createAttribute, deleteAttribute } from '@/app/admin/atributos/actions';
import { toast } from 'sonner';

interface Attribute {
    id: number;
    type: "color" | "size" | "category";
    name: string;
    value: string | null;
}

interface AttributesTabProps {
    colors: Attribute[];
    sizes: Attribute[];
    categories: Attribute[];
}

export function AttributesTab({ colors, sizes, categories }: AttributesTabProps) {
    const colorFormRef = useRef<HTMLFormElement>(null);
    const sizeFormRef = useRef<HTMLFormElement>(null);
    const categoryFormRef = useRef<HTMLFormElement>(null);

    const handleCreate = async (formData: FormData, type: "color" | "size" | "category") => {
        const name = formData.get('name') as string;
        const value = formData.get('value') as string;

        if (!name) return;

        const result = await createAttribute({ type, name, value });
        if (result.success) {
            toast.success(`${type === 'color' ? 'Cor' : type === 'size' ? 'Tamanho' : 'Categoria'} adicionado!`);
            if (type === 'color') colorFormRef.current?.reset();
            if (type === 'size') sizeFormRef.current?.reset();
            if (type === 'category') categoryFormRef.current?.reset();
        } else {
            toast.error(result.error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza que deseja excluir?')) {
            const result = await deleteAttribute(id);
            if (result.success) {
                toast.success('Removido com sucesso!');
            } else {
                toast.error(result.error);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Colors Section */}
            <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#f4e4d4] rounded-2xl flex items-center justify-center text-[#a65d37]">
                        <Palette className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Cores</h3>
                        <p className="text-gray-400 text-sm font-medium">Gerencie as cores dos produtos</p>
                    </div>
                </div>

                <form
                    ref={colorFormRef}
                    action={(formData) => handleCreate(formData, 'color')}
                    className="flex gap-4 mb-8 p-4 bg-gray-50 rounded-2xl"
                >
                    <div className="flex-1 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome da Cor</Label>
                        <Input name="name" placeholder="Ex: Azul Marinho" required className="bg-white border-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cor (Hex)</Label>
                        <div className="flex items-center gap-2">
                            <Input name="value" type="color" className="w-12 h-10 p-1 bg-white border-gray-200 cursor-pointer" defaultValue="#000000" />
                        </div>
                    </div>
                    <div className="flex items-end pb-1">
                        <Button type="submit" size="icon" className="bg-[#a65d37] hover:bg-[#8e4f2f] text-white h-10 w-10 rounded-xl shadow-lg shadow-[#a65d37]/20">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </form>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 flex-1">
                    {colors.map((color) => (
                        <div key={color.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#a65d37]/30 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-10 h-10 rounded-full border border-gray-200 shadow-inner"
                                    style={{ backgroundColor: color.value || '#000' }}
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{color.name}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">{color.value}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(color.id)}
                                className="text-gray-300 hover:text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {colors.length === 0 && (
                        <p className="text-center text-gray-400 py-10 font-medium">Nenhuma cor cadastrada.</p>
                    )}
                </div>
            </div>

            {/* Sizes Section */}
            <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#f4e4d4] rounded-2xl flex items-center justify-center text-[#a65d37]">
                        <Ruler className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Tamanhos</h3>
                        <p className="text-gray-400 text-sm font-medium">Gerencie as medidas disponíveis</p>
                    </div>
                </div>

                <form
                    ref={sizeFormRef}
                    action={(formData) => handleCreate(formData, 'size')}
                    className="flex gap-4 mb-8 p-4 bg-gray-50 rounded-2xl"
                >
                    <div className="flex-1 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sigla / Tamanho</Label>
                        <Input name="name" placeholder="Ex: GG, 42, 1.50m" required className="bg-white border-gray-200" />
                    </div>
                    <div className="flex items-end pb-1">
                        <Button type="submit" size="icon" className="bg-[#a65d37] hover:bg-[#8e4f2f] text-white h-10 w-10 rounded-xl shadow-lg shadow-[#a65d37]/20">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </form>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 flex-1">
                    {sizes.map((size) => (
                        <div key={size.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#a65d37]/30 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-gray-600 border border-gray-200">
                                    {size.name.slice(0, 2)}
                                </div>
                                <p className="font-bold text-gray-900">{size.name}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(size.id)}
                                className="text-gray-300 hover:text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {sizes.length === 0 && (
                        <p className="text-center text-gray-400 py-10 font-medium">Nenhum tamanho cadastrado.</p>
                    )}
                </div>
            </div>

            {/* Categories Section */}
            <div className="xl:col-span-1 lg:col-span-2 xl:col-start-3 bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#f4e4d4] rounded-2xl flex items-center justify-center text-[#a65d37]">
                        <Tag className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Categorias</h3>
                        <p className="text-gray-400 text-sm font-medium">Gerencie as coleções do catálogo</p>
                    </div>
                </div>

                <form
                    ref={categoryFormRef}
                    action={(formData) => handleCreate(formData, 'category')}
                    className="flex gap-4 mb-8 p-4 bg-gray-50 rounded-2xl"
                >
                    <div className="flex-1 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nome da Categoria</Label>
                        <Input name="name" placeholder="Ex: Papelaria, Decoração" required className="bg-white border-gray-200" />
                    </div>
                    <div className="flex items-end pb-1">
                        <Button type="submit" size="icon" className="bg-[#a65d37] hover:bg-[#8e4f2f] text-white h-10 w-10 rounded-xl shadow-lg shadow-[#a65d37]/20">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </form>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 flex-1">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-[#a65d37]/30 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#a65d37]">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <p className="font-bold text-gray-900">{cat.name}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(cat.id)}
                                className="text-gray-300 hover:text-red-500 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <p className="text-center text-gray-400 py-10 font-medium">Nenhuma categoria cadastrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
