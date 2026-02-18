"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing';
import { useCallback } from 'react';
import { useDropzone } from '@uploadthing/react';
import { X, Image as ImageIcon, Star, Sparkles, Plus, Check } from 'lucide-react';
import { createProduct, updateProduct } from '@/app/admin/produtos/actions';
import { cn } from '@/lib/utils';

interface ProductAttribute {
    id: number;
    name: string;
    value: string | null;
}

interface ProductFormProps {
    initialData?: any;
    availableColors: ProductAttribute[];
    availableSizes: ProductAttribute[];
    availableCategories: ProductAttribute[];
}

// ... (CustomUploadDropzone code) ...
function CustomUploadDropzone({
    onUploadComplete,
    onUploadError
}: {
    onUploadComplete: (urls: string[]) => void;
    onUploadError: (error: Error) => void;
}) {
    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res) {
                onUploadComplete(res.map(f => f.url));
            }
        },
        onUploadError: onUploadError,
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            startUpload(acceptedFiles);
        }
    }, [startUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-dashed border-2 rounded-2xl h-full transition-colors flex flex-col items-center justify-center cursor-pointer relative overflow-hidden p-4 min-h-[150px]",
                isDragActive ? "border-[#a65d37] bg-[#a65d37]/5" : "border-[#e8d5c4] hover:border-[#a65d37]/50"
            )}
        >
            <input {...getInputProps()} />
            {isUploading ? (
                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
                    <div className="w-8 h-8 border-4 border-[#a65d37] border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="text-xs font-bold text-[#a65d37] animate-pulse">Enviando...</span>
                </div>
            ) : (
                <>
                    <div className="bg-[#a65d37] rounded-full p-2 mb-2 text-white shadow-md">
                        <Plus className="w-5 h-5" />
                    </div>
                    <p className="text-[#a65d37] font-bold text-xs uppercase tracking-wider text-center px-2">
                        Adicionar
                    </p>
                    <p className="text-gray-400 text-[10px] mt-1 font-medium">Max 8MB</p>
                </>
            )}
        </div>
    );
}

export default function ProductForm({
    initialData,
    availableColors,
    availableSizes,
    availableCategories
}: ProductFormProps) {
    const isEditing = !!initialData;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [selectedColors, setSelectedColors] = useState<string[]>(initialData?.colors || []);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(initialData?.sizes || []);
    const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const generateAIDescription = () => {
        const name = (document.getElementById('name') as HTMLInputElement)?.value || 'este produto';
        const category = (document.getElementById('category') as HTMLSelectElement)?.value || 'artesanato';

        const placeholder = `Este elegante ${name} de Macramê é uma peça exclusiva da coleção Makramando. Feito à mão com fios de algodão de alta qualidade na categoria ${category}, ele combina sofisticação e o charme do artesanal para transformar qualquer ambiente ou look. Uma escolha sustentável e atemporal para quem valoriza os detalhes e a arte milenar do nó.`;

        const textarea = document.getElementById('description') as HTMLTextAreaElement;
        if (textarea) textarea.value = placeholder;
        toast.success("Descrição gerada pela IA (simulação)");
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (images.length === 0) {
            toast.error("Adicione pelo menos uma imagem.");
            return;
        }

        setIsLoading(true);
        const formDataObj = new FormData(event.currentTarget);

        const data = {
            name: formDataObj.get("name") as string,
            description: formDataObj.get("description") as string,
            price: formDataObj.get("price") as string,
            stock: Number(formDataObj.get("stock")),
            category: formDataObj.get("category") as string,
            images: images,
            colors: selectedColors,
            sizes: selectedSizes,
            isFeatured: isFeatured,
        };

        const result = isEditing
            ? await updateProduct(initialData.id, data)
            : await createProduct(data);

        if (result.error) {
            toast.error(result.error);
            setIsLoading(false);
        } else {
            toast.success(isEditing ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!");
            router.push("/admin");
            router.refresh();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 pb-20">
            <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 sticky top-4 z-10">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                        {isEditing ? 'Editar Produto' : 'Novo Produto'}
                    </h2>
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()} className="rounded-2xl font-bold px-6 text-gray-400">
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading} className="bg-[#a65d37] hover:bg-[#8e4f2f] text-white rounded-2xl px-10 h-12 font-black shadow-lg shadow-[#a65d37]/20 transition-all">
                        {isLoading ? "Salvando..." : (isEditing ? "Salvar Alterações" : "Publicar Produto")}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Basic Info */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-[#fcfaf8] border-b border-gray-50 px-8 py-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-gray-900">Detalhes Gerais</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="font-black text-xs uppercase tracking-widest text-gray-400">Nome da Obra</Label>
                                <Input id="name" name="name" defaultValue={initialData?.name} required className="rounded-2xl h-14 bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#a65d37] transition-all font-bold" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <Label htmlFor="description" className="font-black text-xs uppercase tracking-widest text-gray-400">Descrição Detalhada</Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={generateAIDescription}
                                        className="text-[#a65d37] hover:text-[#8e4f2f] hover:bg-[#f4e4d4]/50 rounded-xl font-bold gap-2 text-xs"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Gerar com IA
                                    </Button>
                                </div>
                                <Textarea id="description" name="description" defaultValue={initialData?.description} required className="rounded-2xl min-h-[150px] bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#a65d37] transition-all font-medium leading-relaxed" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="price" className="font-black text-xs uppercase tracking-widest text-gray-400">Preço (R$)</Label>
                                    <Input id="price" name="price" type="number" step="0.01" defaultValue={initialData?.price} required className="rounded-2xl h-14 bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#a65d37] transition-all font-black text-lg" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="stock" className="font-black text-xs uppercase tracking-widest text-gray-400">Disponibilidade</Label>
                                    <Input id="stock" name="stock" type="number" defaultValue={initialData?.stock} required className="rounded-2xl h-14 bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-[#a65d37] transition-all font-bold" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Attributes */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-[#fcfaf8] border-b border-gray-50 px-8 py-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-gray-900">Customização & Atributos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-10">
                            <div className="space-y-4">
                                <Label className="font-black text-xs uppercase tracking-widest text-gray-400">Cores Disponíveis</Label>
                                <div className="flex flex-wrap gap-4">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color.id}
                                            type="button"
                                            onClick={() => toggleColor(color.name)}
                                            className={cn(
                                                "group flex items-center gap-3 px-4 py-2 rounded-2xl border-2 transition-all",
                                                selectedColors.includes(color.name)
                                                    ? "border-[#a65d37] bg-[#f4e4d4]/20"
                                                    : "border-transparent bg-gray-50 hover:bg-gray-100"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-6 h-6 rounded-full shadow-inner relative border border-gray-200"
                                                )}
                                                style={{ backgroundColor: color.value || '#000' }}
                                            >
                                                {selectedColors.includes(color.name) && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Check className={cn("w-3 h-3", color.name === 'Branco' ? "text-gray-900" : "text-white")} />
                                                    </div>
                                                )}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-bold",
                                                selectedColors.includes(color.name) ? "text-[#a65d37]" : "text-gray-400"
                                            )}>{color.name}</span>
                                        </button>
                                    ))}
                                    {availableColors.length === 0 && <p className="text-sm text-gray-400">Nenhuma cor cadastrada.</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="font-black text-xs uppercase tracking-widest text-gray-400">Tamanhos</Label>
                                <div className="flex gap-4">
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() => toggleSize(size.name)}
                                            className={cn(
                                                "w-12 h-12 rounded-2xl border-2 font-black transition-all flex items-center justify-center",
                                                selectedSizes.includes(size.name)
                                                    ? "border-[#a65d37] bg-[#a65d37] text-white shadow-lg shadow-[#a65d37]/20"
                                                    : "border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100"
                                            )}
                                        >
                                            {size.name.slice(0, 2)}
                                        </button>
                                    ))}
                                    {availableSizes.length === 0 && <p className="text-sm text-gray-400">Nenhum tamanho cadastrado.</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-10">
                    {/* Media */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-[#fcfaf8] border-b border-gray-50 px-8 py-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-gray-900">Galeria Visual</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {images.map((url, index) => (
                                    <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                        <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute top-2 left-2 bg-[#a65d37] text-white text-[10px] px-2 py-1 rounded-lg font-black tracking-widest uppercase shadow-lg">
                                                Capa
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {images.length < 4 && (
                                    <div className="aspect-square">
                                        <CustomUploadDropzone
                                            onUploadComplete={(urls: string[]) => {
                                                setImages(prev => [...prev, ...urls].slice(0, 4));
                                                toast.success("Upload concluído!");
                                            }}
                                            onUploadError={(err: Error) => {
                                                toast.error(`Erro: ${err.message}`);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Mínimo 1, Máximo 4 imagens.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Taxonomy & Settings */}
                    <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
                        <CardHeader className="bg-[#fcfaf8] border-b border-gray-50 px-8 py-6">
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-gray-900">Configurações</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="category" className="font-black text-xs uppercase tracking-widest text-gray-400">Coleção / Categoria</Label>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={initialData?.category || ""}
                                    required
                                    className="w-full rounded-2xl h-14 bg-gray-50 border-none focus:ring-2 focus:ring-[#a65d37] outline-none px-6 font-bold appearance-none cursor-pointer transition-all"
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    {availableCategories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFeatured(!isFeatured)}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all",
                                    isFeatured
                                        ? "bg-emerald-50 border-emerald-500/20 text-emerald-700"
                                        : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Star className={cn("w-5 h-5", isFeatured ? "fill-emerald-500" : "")} />
                                    <span className="font-black text-xs uppercase tracking-widest">Destaque na Home</span>
                                </div>
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    isFeatured ? "bg-emerald-500 border-emerald-500" : "border-gray-200"
                                )}>
                                    {isFeatured && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
