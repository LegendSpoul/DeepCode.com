"use server";

import slugify from "slugify";
import { auth } from "../../auth";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createDetails = async (state, form, details) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "details")
  );

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const post = {
      title,
      description,
      category,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      details,
    };

    const result = await writeClient.create({ _type: "post", ...post });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
