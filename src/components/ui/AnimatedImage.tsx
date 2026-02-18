"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    delay?: number;
    priority?: boolean;
}

export const AnimatedImage = ({
    src,
    alt,
    className,
    containerClassName,
    delay = 0
}: AnimatedImageProps) => {
    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            <motion.div
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: "easeOut"
                }}
                className="w-full h-full"
            >
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    src={src}
                    alt={alt}
                    className={cn("w-full h-full object-cover rounded-2xl", className)}
                />

                {/* Subtle Shine Effect on Entry */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: "100%", opacity: [0, 0.3, 0] }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1.2,
                        delay: delay + 0.5,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10"
                />
            </motion.div>
        </div>
    );
};
