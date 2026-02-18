"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2 } from "lucide-react";
import { updateUserRole } from "@/app/admin/usuarios/actions";
import { toast } from "sonner";

interface PromoteUserButtonProps {
    userId: string;
}

export function PromoteUserButton({ userId }: PromoteUserButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handlePromote() {
        if (!confirm("Tem certeza que deseja promover este usuário a Administrador?")) return;

        setIsLoading(true);
        try {
            const result = await updateUserRole(userId, "admin");
            if (result.success) {
                toast.success("Usuário promovido com sucesso!");
            }
        } catch (error: any) {
            toast.error(error.message || "Erro ao promover usuário.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            variant="ghost"
            className="text-[#a65d37] hover:bg-[#f4e4d4]/50 rounded-xl font-bold gap-2"
            onClick={handlePromote}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <UserPlus className="w-4 h-4" />
            )}
            Tornar Admin
        </Button>
    );
}
