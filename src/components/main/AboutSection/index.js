"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCloudSec } from "../common/IconCloudSec";
import { HyperText } from "@/components/ui/hyper-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import PDFModal from "../common/PDFModal";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TextScramble } from "@/components/ui/text-scramble";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Index = React.forwardRef(({ className, ...props }, ref) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const sectionRef = React.useRef(null);
    const contentRef = React.useRef(null);

    const textRef = React.useRef(null);
    const isInView = useInView(textRef, { once: true });

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax reveal content
            gsap.fromTo(
                contentRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top top",
                        scrub: true,
                    },
                }
            );

            // Glow animations (as you had)
            gsap.to(".glow-center", {
                scale: 1,
                opacity: 0.4,
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: ".glow-center",
                    start: "top 80%",
                },
            });

            gsap.to(".glow-left", {
                x: 0,
                opacity: 0.5,
                duration: 1,
                delay: 0.4,
                scrollTrigger: {
                    trigger: ".glow-left",
                    start: "top 80%",
                },
            });

            gsap.to(".glow-right", {
                x: 0,
                opacity: 0.5,
                duration: 1,
                delay: 0.4,
                scrollTrigger: {
                    trigger: ".glow-right",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            id="about"
            ref={sectionRef}
            className={cn(
                "relative z-10 flex min-h-[100vh] w-full flex-col justify-center overflow-hidden bg-black text-white px-6 py-20",
                className
            )}
            {...props}
        >
            {/* Light Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="glow-center scale-75 opacity-0 absolute top-0 left-1/2 -translate-x-1/2 w-[30rem] h-64 bg-white/20 blur-3xl rounded-full" />
                <div className="glow-left opacity-20 -translate-x-24 absolute left-0 top-1/3 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent blur-[120px]" />
                <div className="glow-right opacity-20 translate-x-24 absolute right-0 top-1/3 w-80 h-80 bg-gradient-to-bl from-white/10 to-transparent blur-[120px]" />
            </div>

            {/* Content + IconCloudSec Layout */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Content */}
                <div ref={contentRef} className="text-center lg:text-left space-y-6 flex-1">
                    <HyperText className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mix-blend-difference drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]" text="About Me" />

                    <div ref={textRef} className="space-y-4">
                        {isInView && (
                            <>
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <TextGenerateEffect
                                        className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto lg:mx-0"
                                        duration={1}
                                        words="Hi there! I’m"
                                    />
                                    <TextGenerateEffect
                                        className="bg-gradient-to-b from-white to-blue-500 text-transparent bg-clip-text"
                                        duration={2.5}
                                        words="Anuj Verma"
                                    />
                                </div>

                                <div className="space-y-8">
                                    <TextScramble duration={1.5} className="text-base text-white/70 leading-relaxed">
                                        I’m a passionate software engineer with a knack for building innovative solutions. I specialize in creating dynamic web applications and have a strong foundation in full-stack development.
                                    </TextScramble>

                                    <TextScramble duration={1.5} className="text-base text-white/70 leading-relaxed">
                                        Whether it’s real-time features with WebSockets, a cloud-integrated CMS, or a mobile app — I’m always exploring what’s next in tech.
                                    </TextScramble>

                                    <TextScramble duration={1.5} className="text-base text-white/70 leading-relaxed">
                                        Curious about my work or just want to chat?
                                    </TextScramble>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
                        <MagneticButton>
                            <motion.a
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-md hover:shadow-blue-500/30 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Resume
                            </motion.a>
                        </MagneticButton>

                        <MagneticButton>
                            <motion.a
                                href="#contact"
                                className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Let&apos;s Connect
                            </motion.a>
                        </MagneticButton>
                    </div>
                </div>

                {/* Right: Icon Cloud */}
                <motion.div
                    className="flex-1 w-full h-[400px] flex items-center justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <IconCloudSec />
                </motion.div>
            </div>
            <PDFModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                file="/docs/Resume.pdf"
            />
        </div>
    );
});

Index.displayName = "AboutSection";
export default Index;
