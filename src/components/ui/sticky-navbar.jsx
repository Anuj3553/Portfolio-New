"use client";

import React, { useEffect, useState } from "react";
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
import { Menu, X } from "lucide-react";

export const StickyNav = ({
  logo,
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
    <AnimatePresence mode="wait">
      <motion.div
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
        className={cn(
          "flex w-full max-w-3xl fixed top-6 inset-x-0 mx-auto",
          "border border-white/20 rounded-full",
          "bg-black/80 backdrop-blur-md",
          "shadow-lg shadow-black/30",
          "px-6 py-3 items-center justify-between",
          "z-[5000]",
          className
        )}>
        {/* Logo and Name */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center space-x-3"
        >
          <div className="relative h-10 w-10 cursor-pointer rounded-full overflow-hidden border border-white/20">
            <Image
              src={logo}
              fill
              alt="logo"
              className="object-contain"
            />
          </div>
          <span className="text-lg tracking-[4px] font-[Gothic] font-bold cursor-pointer text-white uppercase">
            {name}
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={`desktop-${navItem.name}-${idx}`}
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
          className="border hidden md:flex text-sm font-medium relative border-white dark:border-white/[0.2] text-white dark:text-white px-4 py-2 rounded-full hover:cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors duration-200 hover:text-black">
          <span>{mainItem}</span>
          <span
            className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[4999] pt-24 px-6 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center space-y-8"
            >
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`mobile-${navItem.name}-${idx}`}
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
                className="mt-8 border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                {mainItem}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
