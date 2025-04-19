"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Download, X, XIcon } from 'lucide-react';
import { FiExternalLink } from 'react-icons/fi';  // Import the external link icon
import '@react-pdf-viewer/core/lib/styles/index.css';
import Portal from "./Portal";

const PDFModal = ({ isOpen, onClose, file }) => {
    const modalRef = useRef(null);

    useEffect(() => {
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

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = file;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openInNewTab = () => {
        window.open(file, '_blank');
    };

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[5000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="relative bg-black rounded-xl border border-white/20 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:h-[90vh] sm:max-[90vh]"
                        >
                            {/* PDF Viewer */}
                            <div className="flex-1 w-full overflow-hidden">
                                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                                    <Viewer fileUrl={file} />
                                </Worker>
                            </div>

                            {/* Footer with Action Buttons */}
                            <div className="w-full bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 flex justify-between gap-2 border-t border-white/10">
                                {/* Open in New Tab Button (Left side) */}
                                <button
                                    onClick={openInNewTab}
                                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                                >
                                    <FiExternalLink size={18} />
                                    <span>Open in Tab</span>
                                </button>

                                {/* Download Button (Right side) */}
                                <button
                                    onClick={handleDownload}
                                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                                >
                                    <Download size={18} />
                                    <span>Download</span>
                                </button>

                                {/* Close Button (Right side) */}
                                <button
                                    onClick={onClose}
                                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                                >
                                    <XIcon size={18} />
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default PDFModal;
