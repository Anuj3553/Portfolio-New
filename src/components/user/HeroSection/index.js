"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../../../public/images/common/logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
    const nameRef = useRef(null);

    let github = "https://github.com/Anuj3553/"
    let linkedin = "https://www.linkedin.com/in/anuj-verma-67493125a/"
    let instagram = "https://www.instagram.com/anuj.verma_official/"

    useEffect(() => {
        const letters = nameRef.current.querySelectorAll("span");

        gsap.fromTo(
            letters,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.08,
                delay: 1,
            }
        );
    }, []);

    return (
        <div className="relative h-screen w-full z-10 bg-black/80 flex flex-col items-center justify-center overflow-hidden">

            {/* Floating Logo */}
            <motion.div
                className="absolute md:w-180 md:h-200 w-100 h-100  mix-blend-difference drop-shadow-[0_5px_25px_rgba(255,255,255,0.4)]"
                initial={{ y: -15 }}
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
                <Image
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                />
            </motion.div>

            {/* Large Portfolio Text */}
            <h1 className="lg:text-[160px] md:text-[100px] text-[50px] font-[Gothic] font-extrabold tracking-tight z-10 relative text-white mix-blend-difference drop-shadow-[0_5px_5px_rgba(255,255,255,0.4)]">
                PORTFOLIO
            </h1>

            {/* Signature Name */}
            <div className="absolute rotate-[-15deg] tracking-widest bottom-30 lg:right-60 md:right-20 text-center z-20 text-yellow-500 text-xl md:text-2xl font-[modernline]" ref={nameRef}>
                {"Anuj Verma".split("").map((letter, i) => (
                    <span key={i} className="inline-block">
                        {letter}
                    </span>
                ))}
            </div>

            {/* Social Icons */}
            <div className="absolute bottom-10 flex gap-6 z-20">
                <a href={github} target="_blank">
                    <FaGithub className="text-2xl md:text-3xl hover:scale-125 transition transform text-white hover:text-blue-400" />
                </a>
                <a href={linkedin} target="_blank">
                    <FaLinkedin className="text-2xl md:text-3xl hover:scale-125 transition transform text-white hover:text-blue-400" />
                </a>
                <a href={instagram} target="_blank">
                    <FaInstagram className="text-2xl md:text-3xl hover:scale-125 transition transform text-white hover:text-pink-400" />
                </a>
            </div>
        </div>
    );
}
