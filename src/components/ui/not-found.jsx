"use client";

import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NotFound({
  title = "Page not found",
  description = "Lost, this page is. In another system, it may be."
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="relative text-center z-[1] bg-black h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated Illustration */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-balance text-5xl font-semibold tracking-tight text-secondary sm:text-7xl"
      >
        {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8"
      >
        {description}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6"
      >
        <Button variant="secondary" asChild className="group">
          <div onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft
              className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Go back
          </div>
        </Button>
        <Button className="-order-1 sm:order-none" asChild>
          <div onClick={() => router.push("/")} className="cursor-pointer">
            Take me home
          </div>
        </Button>
      </motion.div>

      {/* Background elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}