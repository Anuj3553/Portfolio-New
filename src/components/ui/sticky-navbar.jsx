"use client";

import React, { useEffect, useState } from "react";
import "@/styles/Home.css"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedHamburger from "../main/common/AnimatedHamburger";
import { BorderBeam } from "./border-beam";

export const StickyNav = ({
  avatar,
  name,
  navItems,
  mainItem,
  mainItemLink,
  className
}) => {
  const { scrollYProgress } = useScroll();

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsShaking(true);
  };
  const handleMouseLeave = () => {
    setIsShaking(false);
  };

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence>
      <motion.div
        // For floating navbar
        // initial={{
        //   opacity: 1,
        //   y: -100,
        // }}
        // animate={{
        //   y: visible ? 0 : -100,
        //   opacity: visible ? 1 : 0,
        // }}
        // transition={{
        //   duration: 0.2,
        // }}

        // For sticky navbar

        // For sticky navbar
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => router.push("/")}
        className={cn(
          "flex w-full max-w-3xl fixed top-6 inset-x-0 mx-auto",
          "border border-white/20 rounded-full",
          "bg-black/80 backdrop-blur-md",
          "shadow-lg shadow-black/30",
          "px-6 py-3 items-center justify-between",
          "z-[5000]",
          "drop-shadow-[0_0.1px_0.2px_rgba(255,255,255,0.4)]",
          className
        )}>
        {/* Border Beam */}
        <BorderBeam duration={8} size={100} />

        {/* Logo and Name */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center space-x-3 cursor-logo"
        >
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20">
            <Image
              src={avatar}
              fill
              alt="avatar"
              className="object-contain"
            />
          </div>
          <span className="text-lg tracking-[4px] font-[Gothic] font-bold text-white uppercase">
            {name}
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={`${navItem.id}-${idx}`}
              href={navItem.link}
              className={cn(
                "relative text-white/90 hover:text-white",
                "text-sm font-medium tracking-wide",
                "transition-colors duration-200",
                "after:content-[''] after:absolute after:-bottom-1 after:left-0",
                "after:w-0 after:h-px after:bg-blue-400",
                "hover:after:w-full after:transition-all after:duration-300"
              )}
            >
              {navItem.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            x: isShaking ? [0, -5, 5, -5, 5, 0] : 0,
            rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => router.push(mainItemLink)}
          transition={{ duration: 0.5 }}
          className="border cursor-main hidden md:flex text-sm font-medium relative border-white dark:border-white/[0.2] hover:drop-shadow-[0_2px_1px_rgba(255,255,255,0.4)] text-white dark:text-white px-4 py-2 rounded-full hover:cursor-pointer hover:bg-white transition-colors duration-200 hover:text-black">
          <span>{mainItem}</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px " />
        </motion.button>

        {/* Mobile Hamburger Button */}
        <AnimatedHamburger
          isOpen={mobileMenuOpen}
          toggleMenu={toggleMenu}
        />
      </motion.div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[4999] pt-35 px-6 md:hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center space-y-8"
          >
            {navItems.map((navItem, idx) => (
              <motion.div
                key={`${navItem.id}-${idx}`}
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  href={navItem.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-white hover:text-blue-400 transition-colors"
                >
                  {navItem.name}
                </Link>
              </motion.div>
            ))}

            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 + navItems.length * 0.05 }}
              onClick={() => {
                setMobileMenuOpen(false);
                router.push(mainItemLink);
              }}
              className="relative mt-8 border border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-300"
            >
              {mainItem}
              {/* Border Beam */}
              <BorderBeam duration={8} size={100} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
