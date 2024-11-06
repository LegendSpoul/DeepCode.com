"use client";

//imports
import Logo from "../../public/assets/images/logo.webp";
import Menu from "../../public/assets/images/menu.svg";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Poppins,
  Roboto,
  Oswald,
  Lato,
  Roboto_Condensed,
} from "@next/font/google";

//fonts
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal"],
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal"],
});

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal"],
});

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
        "flex-col",
        "absolute",
        "top-[80px]",
        "bg-gray-800",
        "w-fit",
        "left-[0px]",
        "p-8",
        "gap-10",
        "flex",
      ];
    } else {
      menuClasses.push("hidden", "md:flex");
    }

    return menuClasses.join(" ");
  }

  return (
    <nav className="border-white border-b-[1px] sticky top-0 ">
      <div className="conatiner flex justify-between items-center mx-auto px-4 h-20 backdrop-blur-lg ">
        {/* Headings */}
        <div className="flex gap-2 justify-between items-center ">
          <Image
            src={Logo}
            width={50}
            height={50}
            className="image rounded-full"
            alt="logo"
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl">
            <span className={oswald.className}>
              DeepCode
              <span className={lato.className}>.com</span>
            </span>
          </h1>
        </div>
        {/* Navbar */}
        <div className="nav-mobile flex justify-center items-center ">
          <div className={getMenuClasses()}>
            <Link
              href="/"
              className="flex justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70 transition-all duration-300"
            >
              <span className={poppins.className}>Home</span>
            </Link>
            <Link
              href="/"
              className="flex justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70"
            >
              <span className={poppins.className}>Post</span>
            </Link>
            <Link
              href="/"
              className="flex justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70"
            >
              <span className={poppins.className}>Tutorials</span>
            </Link>
            <Link
              href="/"
              className=" justify-center items-center transition-all duration-300 hover:opacity-70 hover:text-black flex text-[24px] rounded-full px-4 text-teal-400 bg-white border-green-700 border-[1px]"
            >
              <div className="">
                <span className={roboto_condensed.className}>Sign In</span>
              </div>
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
                stroke="currentColor"
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
                stroke="currentColor"
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
