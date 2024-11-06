import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const PostCard = ({ post }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <>
      <li className="bg-white border-blue-400 border-[3px] rounded-3xl grid ">
        <div className="flex justify-between items-center px-5 text-[18px] mt-3 ">
          <p>{formatDate(_createdAt)}</p>
          <div className="flex gap-1 items-center">
            <EyeIcon className="text-[16px]" size="24px" />
            <span>{views}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center mx-5 mb-3">
          <div className="grid gap-[-100px] ">
            <Link href={`/user/${author?._id}`}>
              <span>
                <p className="text-[22px] font-medium line-clamp-1">
                  {author?.name ? <>{author?.name}</> : <>Author Profile</>}
                </p>
              </span>
            </Link>
            <Link href={`/post/${_id}`}>
              <span>
                <h3 className="text-[34px] font-semibold line-clamp-1">
                  {title}
                </h3>
              </span>
            </Link>
          </div>
          <Link href={`/user/${author?._id}`}></Link>
        </div>
        <Link href={`/post/${_id}`}>
          <p className="post-card_desc px-5">{description}</p>
        </Link>
        <div className="flex justify-between gap-3 mt-5">
          <div className="ml-5">
            <Link href={`/?query=${category?.toLowerCase()}`}>
              <p className="text-3xl">{category}</p>
            </Link>
          </div>
          <div className="pb-3 pr-3">
            <Button className="post-card_btn " asChild>
              <Link href={`/post/${_id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default PostCard;
