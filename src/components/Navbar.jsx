import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/images/logo.webp";
import { auth, signOut, signIn } from "../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import MobileNavbar from "./MobileNavbar";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-9  border-white border-b-[1px] py-1 shadow-lg font-work-sans sticky top-[0%] backdrop-blur-sm">
      <nav className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image
            src={Logo}
            className="rounded-full"
            alt="DeepCode image"
            width={40}
            height={40}
          />
          <div className="flex items-center justify-center">
            <h1 className="text-white text-3xl">
              <span>DeepCode</span>
            </h1>
          </div>
        </div>
        <MobileNavbar />
        <div className="hidden items-center gap-5 md:flex">
          <div className="pre-links ">
            <Link
              href="/"
              className=" justify-center items-center text-[23px] pr-9 text-teal-400 hover:opacity-70 transition-all duration-300"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/tests"
              className="justify-center items-center text-[23px] pr-6 text-teal-400 hover:opacity-70 transition-all duration-300"
            >
              <span>Tests</span>
            </Link>
          </div>
          {session && session?.user ? (
            <>
              <Link href="/post/create">
                <span className="justify-center items-center text-[23px] pr-4 text-teal-400 hover:opacity-70 transition-all duration-300">
                  Post
                </span>
              </Link>

              <form
                className="flex gap-x-3"
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden  justify-center items-center transition-all duration-300 hover:opacity-70 hover:text-black flex text-[24px] rounded-full px-4 text-teal-400 bg-white border-green-700 border-[1px]">
                    <span>Logout</span>
                  </span>
                </button>
                <Link href={`/user/${session?.id}`}>
                  <Avatar className="size-10">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </Link>
              </form>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";

                  await signIn("github");
                }}
              >
                <button
                  className=" justify-center items-center transition-all duration-300 hover:opacity-70 hover:text-black flex text-[24px] rounded-full px-4 text-teal-400 bg-white border-green-700 border-[1px]"
                  type="submit"
                >
                  <span>Sign In</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
