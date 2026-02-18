"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    y?: number;
}

export const Reveal = ({
    children,
    width = "100%",
    delay = 0.2,
    duration = 0.5,
    y = 20
}: RevealProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};
