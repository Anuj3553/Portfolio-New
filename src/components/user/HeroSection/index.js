"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../../../public/images/common/logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
    const nameRef = useRef(null);
    const portfolioRef = useRef(null);
    const socialIconsRef = useRef(null);
    const containerRef = useRef(null);

    const socialLinks = {
        github: "https://github.com/Anuj3553/",
        linkedin: "https://www.linkedin.com/in/anuj-verma-67493125a/",
        instagram: "https://www.instagram.com/anuj.verma_official/"
    };

    useEffect(() => {
        // Master timeline for coordinated animations
        const masterTL = gsap.timeline();

        // Background fade-in
        masterTL.from(containerRef.current, {
            backgroundColor: "rgba(0,0,0,0)",
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Logo animation
        masterTL.from(".floating-logo", {
            opacity: 0,
            scale: 0.8,
            y: -50,
            duration: 1,
            ease: "sine.inOut"
        }, 0.2);

        // PORTFOLIO text animation
        const letters = portfolioRef.current.querySelectorAll("span");
        gsap.set(letters, { opacity: 0, y: 30 });

        masterTL.to(letters, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.05
        }, 0.5);

        // Name signature animation
        const nameLetters = nameRef.current.querySelectorAll("span");
        gsap.set(nameLetters, { opacity: 0, y: 20 });

        masterTL.to(nameLetters, {
            opacity: 1,
            y: 0,
            rotation: -15,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.08
        }, 1);

        // Social icons animation
        const icons = socialIconsRef.current.querySelectorAll("a");
        gsap.set(icons, { opacity: 0, y: 20 });

        masterTL.to(icons, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1
        }, 1.5);

        return () => masterTL.kill();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative h-screen w-full z-10 bg-black/80 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Floating Logo */}
            <motion.div
                className="floating-logo absolute md:w-180 md:h-200 w-100 h-100 mix-blend-difference drop-shadow-[0_5px_25px_rgba(255,255,255,0.4)]"
                animate={{
                    y: [-15, 15, -15],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                    priority
                />
            </motion.div>

            {/* Large Portfolio Text */}
            <h1
                ref={portfolioRef}
                className="lg:text-[160px] md:text-[100px] text-[50px] font-[Gothic] font-extrabold tracking-tight z-10 relative text-white mix-blend-difference drop-shadow-[0_5px_5px_rgba(255,255,255,0.4)]"
            >
                {"PORTFOLIO".split("").map((letter, i) => (
                    <span key={i} className="inline-block">
                        {letter}
                    </span>
                ))}
            </h1>

            {/* Signature Name */}
            <div
                ref={nameRef}
                className="absolute rotate-[-15deg] tracking-widest bottom-30 lg:right-60 md:right-20 text-center z-20 text-yellow-500 text-xl md:text-2xl font-[modernline]"
            >
                {"Anuj Verma".split("").map((letter, i) => (
                    <span key={i} className="inline-block">
                        {letter}
                    </span>
                ))}
            </div>

            {/* Social Icons */}
            <motion.div
                ref={socialIconsRef}
                className="absolute bottom-10 flex gap-6 z-20"
                whileHover={{ scale: 1.05 }}
            >
                <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaGithub className="text-2xl md:text-3xl transition-transform text-white hover:text-violet-500" />
                </motion.a>
                <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaLinkedin className="text-2xl md:text-3xl transition-transform text-white hover:text-blue-500" />
                </motion.a>
                <motion.a
                    href={socialLinks.instagram}
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaInstagram className="text-2xl md:text-3xl transition-transform text-white hover:text-pink-500" />
                </motion.a>
            </motion.div>

            {/* Subtle floating particles */}
            <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        animate={{
                            x: [0, gsap.utils.random(-50, 50)],
                            y: [0, gsap.utils.random(-50, 50)],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: gsap.utils.random(5, 10),
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}