"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLayout({ children }) {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!overlayRef.current) return;

        const numStrips = 5;
        const strips = [];

        // Clear any previous strips
        overlayRef.current.innerHTML = "";

        // Create vertical strips
        for (let i = 0; i < numStrips; i++) {
            const strip = document.createElement("div");
            strip.className = "absolute top-0 h-full bg-white z-50";
            strip.style.width = `${100 / numStrips}%`;
            strip.style.left = `${(100 / numStrips) * i}%`;
            strip.style.transform = "scaleY(0)";
            overlayRef.current.appendChild(strip);
            strips.push(strip);
        }

        // Timeline animation
        const tl = gsap.timeline();

        // Animate strips in (cover screen)
        tl.to(strips, {
            scaleY: 1,
            transformOrigin: "bottom center",
            stagger: 0.1,
            duration: 0.2,
            ease: "power3.inOut",
        });

        // Animate strips out (reveal screen)
        tl.to(strips, {
            scaleY: 0,
            transformOrigin: "top center",
            stagger: 0.1,
            duration: 0.2,
            ease: "power3.inOut",
        });

        // Cleanup
        return () => {
            tl.kill();
            strips.forEach(strip => strip.remove());
        };
    }, [pathname]);

    return (
        <div className="relative overflow-hidden">
            <div
                ref={overlayRef}
                className="pointer-events-none absolute inset-0 z-50"
            />
            <div
                ref={containerRef}
                className="relative z-10"
            >
                {children}
            </div>
        </div>
    );
}
