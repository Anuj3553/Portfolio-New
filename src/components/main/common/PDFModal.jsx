"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Portal from "./Portal";

const PDFModal = ({ isOpen, onClose, file }) => {
    const modalRef = React.useRef(null);

    // Close modal when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[5000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="relative bg-black rounded-xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                        >
                            {/* PDF Container */}
                            <div className="h-full w-full">
                                <iframe
                                    src={`${file}#view=fitH`}
                                    className="w-full h-screen"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Resume PDF"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default PDFModal;