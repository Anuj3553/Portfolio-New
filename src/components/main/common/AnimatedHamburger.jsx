"use client"

import React from "react";

const AnimatedHamburger = ({ isOpen, toggleMenu }) => {
    return (
        <label
            className="cursor-pointer md:hidden z-50"
            onClick={toggleMenu} // directly toggle on label click
        >
            <svg
                viewBox="0 0 32 32"
                className="h-10 transition-transform duration-600 ease-in-out rotate-45"
            >
                <path
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    style={{
                        strokeDasharray: isOpen ? "20 300" : "12 63",
                        strokeDashoffset: isOpen ? "-32.42" : "0",
                    }}
                    className="stroke-white fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-600 ease-in-out"
                />
                <path
                    d="M7 16 27 16"
                    className="stroke-white fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-600 ease-in-out"
                />
            </svg>
        </label>
    );
};


export default AnimatedHamburger;
