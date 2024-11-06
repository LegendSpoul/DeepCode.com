"use client";

//imports
import Logo from "../../public/assets/images/logo.webp";
import Menu from "../../public/assets/images/menu.svg";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  //client side(useState).For Mobile View
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  //Desktop view(styling)
  function getMenuClasses() {
    let menuClasses = [];

    if (isOpen) {
      menuClasses = [
        "text-center",
        "absolute",
        "top-[100px]",
        "bg-gray-800",
        "w-[900px]",
        "p-8",
        "gap-10",
        "grid",
      ];
    } else {
      menuClasses.push("hidden", "md:flex");
    }

    return menuClasses.join(" ");
  }

  return (
    <nav className="border-white  sticky top-[0%] ">
      <div className="conatiner flex justify-between items-center mx-auto px-4 h-20 backdrop-blur-lg ">
        {/* Navbar */}
        <div className="nav-mobile flex justify-center items-center md:hidden ">
          <div className={getMenuClasses()}>
            <Link
              href="/"
              className="flex justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70 transition-all duration-300"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/test"
              className="flex justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70"
            >
              <span>Tests</span>
            </Link>
          </div>
        </div>
        {/* Menu and Wrong svg(Mobile View) */}
        <div className="md:hidden gap-8 flex items-center">
          {/*Search*/}

          <button onClick={toggle} type="button">
            {isOpen ? (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
