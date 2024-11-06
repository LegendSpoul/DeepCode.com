import SearchForm from "@/components/SearchForm";
import React from "react";
import PostCard from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { auth } from "../../auth";

export default async function Home({ searchParams }) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  const posts = await client.fetch(POST_QUERY, params);

  //const { data: posts } = await sanityFetch({ POST_QUERY });

  return (
    <>
      <main>
        <section id="section1">
          <div className="flex  justify-center items-center">
            <div className="py-28 ">
              <h1 className="flex text-white justify-center items-center text-5xl md:text-6xl lg:text-8xl">
                <span>
                  DeepCode<span>.com</span>
                </span>
              </h1>
              <p className="text-red-300 flex justify-center items-center text-[10px] md:text-[12px] lg:text-[20px] py-4 p-0">
                <span>
                  Express your ideas with the world and learn with DeepCode
                </span>
              </p>
              <div className="pt-3">
                <div className="w-full flex  justify-center items-center">
                  <SearchForm query={query} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section_container" id="section2">
          <span>
            <p className="font-semibold text-3xl text-white">
              {query ? (
                <>
                  <span className="text-2xl">
                    <span>{`Search results for "${query}"`}</span>
                  </span>
                </>
              ) : (
                "Current Posts"
              )}
            </p>
            <ul className="mt-7 card_grid">
              {posts?.length > 0 ? (
                posts.map((post) => <PostCard key={post?._id} post={post} />)
              ) : (
                <p className="no-results text-white text-3xl">No posts found</p>
              )}
            </ul>
          </span>
        </section>
      </main>
    </>
  );
}
