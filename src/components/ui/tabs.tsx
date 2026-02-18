"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextProps {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined);

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
    const [activeTab, setActiveTab] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("w-full", className)}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("flex bg-gray-50/50 p-1 rounded-2xl border border-gray-100 w-fit", className)}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap",
                isActive
                    ? "bg-white text-[#a65d37] shadow-sm shadow-[#a65d37]/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50",
                className
            )}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <div className={cn("mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500", className)}>
            {children}
        </div>
    );
}
