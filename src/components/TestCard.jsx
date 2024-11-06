import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const TestCard = ({ heading, paragraph, link }) => {
  return (
    <div className="bg-white transition-all duration-200 rounded-xl hover:border-blue-700 border-[3px]  border-blue-400 w-full h-[300px]">
      <div className="py-5 px-10 grid justify-center items-center">
        <h1 className="pt-3 text-gray-800 text-4xl font-'poppins' flex justify-center items-center">
          {heading} Test
        </h1>
        <p className="flex justify-center items-center">{paragraph}</p>
      </div>
      <div className="getting-started flex justify-center items-center pt-5">
        <Button className=" text-3xl p-8 rounded-xl">
          <Link href={link}>Start Test ({heading})</Link>
        </Button>
      </div>
    </div>
  );
};

export default TestCard;
