import PostForm from "@/components/PostForm";
import React from "react";
import { auth } from "../../../../auth";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <>
      <section className="pink_container !min-h-[230px] !rounded-lg">
        <h1 className="heading">Submit your Post Details</h1>
      </section>
      <PostForm />
    </>
  );
};

export default page;
