"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:shadow-2xl group-[.toaster]:border-none group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:gap-3 group-[.toaster]:font-bold group-[.toaster]:text-white",
                    description: "group-[.toast]:text-white/90 font-medium",
                    actionButton:
                        "group-[.toast]:bg-white group-[.toast]:text-gray-900 group-[.toast]:rounded-xl px-4 py-2 hover:bg-gray-100 transition-all font-bold",
                    cancelButton:
                        "group-[.toast]:bg-white/20 group-[.toast]:text-white group-[.toast]:rounded-xl px-4 py-2 transition-all",
                    success: "!bg-emerald-500 !text-white",
                    error: "!bg-red-500 !text-white",
                    info: "!bg-blue-500 !text-white",
                    warning: "!bg-amber-500 !text-white",
                    closeButton: "!bg-white/20 !text-white !border-none hover:!bg-white/40 !transition-all",
                },
            }}
            richColors={false}
            closeButton
            position="top-center"
            {...props}
        />
    )
}

export { Toaster }
