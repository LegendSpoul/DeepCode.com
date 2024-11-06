//post id

import MarkdownIt from "markdown-it";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { POST_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { auth } from "../../../../auth";
import Image from "next/image";
export const experimental_ppr = true;

const md = new MarkdownIt();

const page = async ({ params }) => {
  const session = await auth();

  const id = (await params).id;

  const post = await client.fetch(POST_BY_ID_QUERY, { id });

  if (!post) return notFound();
  const parsedContent = md.render(post?.details || "");
  return (
    <>
      <main className="text-black ">
        <section className="!min-h-[230px] pink_container">
          <p className="tag !text-xl">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl font-sans">{post.description}</p>
        </section>
        <section className="section_container">
          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex justify-between gap-5">
              <Link
                href={`/user/${post.author?._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <div className="text-white">
                  <p className="text-[30px] font-medium">
                    {post?.author?.name ? (
                      <>{post.author.name}</>
                    ) : (
                      <>Author Profile</>
                    )}
                  </p>
                  <p className="text-[20px] pb-6 font-medium">
                    @
                    {post?.author?.username ? (
                      <>{post.author.username}</>
                    ) : (
                      <>Author Username</>
                    )}
                  </p>
                </div>
              </Link>
              <p className="category-tag text-white font-sans">
                {post.category}
              </p>
            </div>
            <h3 className="text-3xl text-white font-bold font-sans">
              Post Details
            </h3>
            <div className="border-white border-[2px] w-fit p-5">
              {parsedContent ? (
                <article
                  className="text-white prose max-w-4xl font-sans break-all"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p className="no-result">No Details Provided</p>
              )}
            </div>
          </div>
          <hr className="divider" />

          {/* TODO:Recommended posts*/}
        </section>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </main>
    </>
  );
};

export default page;
