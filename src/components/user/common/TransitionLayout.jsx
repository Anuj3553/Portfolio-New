"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLayout({ children }) {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Kill any existing animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Create timeline for complex sequencing
        const tl = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => animationRef.current = null
        });

        // Store the timeline reference
        animationRef.current = tl;

        // Morphing blob effect
        tl.fromTo(containerRef.current,
            {
                clipPath: "circle(0% at 50% 50%)",
                opacity: 0,
                y: 40,
                scale: 0.95,
                rotation: 2,
                skewX: 5
            },
            {
                clipPath: "circle(100% at 50% 50%)",
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                skewX: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)"
            }
        );

        // Add floating particles effect
        const particles = [];
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute w-2 h-2 rounded-full bg-white opacity-70";
            containerRef.current.appendChild(particle);
            particles.push(particle);

            gsap.set(particle, {
                x: gsap.utils.random(-50, 50),
                y: gsap.utils.random(-50, 50),
                scale: gsap.utils.random(0.5, 1.5)
            });

            tl.to(particle, {
                x: gsap.utils.random(-100, 100),
                y: gsap.utils.random(-100, 100),
                opacity: 0,
                duration: 1,
                ease: "power1.out"
            }, 0);
        }

        // Cleanup function
        return () => {
            tl.kill();
            particles.forEach(p => p.remove());
        };

    }, [pathname]);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{
                willChange: "transform, opacity, clip-path",
                transformOrigin: "center center"
            }}
        >
            {children}
        </div>
    );
}