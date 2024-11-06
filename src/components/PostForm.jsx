"use client";

import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createDetails } from "@/lib/actions";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState("");
  const { toast } = useToast();

  const router = useRouter();

  const handleFormSubmit = async (prevState, formData) => {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        details,
      };

      await formSchema.parseAsync(formValues);

      const result = await createDetails(prevState, formData, details);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "An Post has been created",
          variant: "destructive",
        });

        router.push(`/post/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors);
        toast({
          title: "Error",
          description: "Please check your fields and try again",
          variant: "destructive",
        });

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occcured",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occcured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="post-form">
      {/* Title */}
      <div>
        <div className="pt-10">
          <label htmlFor="title" className="post-form_label !pt-10 !text-white">
            Title
          </label>
        </div>
        <div className="px-10">
          <Input
            id="title"
            name="title"
            className="post-form_input "
            required
            placeholder="Post Title"
          />
        </div>
        {errors.title && <p className="post-form_error">{errors.title}</p>}
      </div>
      {/* Description */}
      <div>
        <div className="pt-10">
          <label
            htmlFor="description"
            className="post-form_label !pt-10 !text-white"
          >
            Description
          </label>
        </div>
        <div className="px-10">
          <Textarea
            id="description"
            name="description"
            className="post-form_textarea"
            required
            placeholder="Post Description"
          />
        </div>
        {errors.description && (
          <p className="post-form_error">{errors.description}</p>
        )}
      </div>
      {/* Category */}
      <div>
        <div className="pt-10">
          <label
            htmlFor="category"
            className="post-form_label !pt-10 !text-white"
          >
            Category
          </label>
        </div>
        <div className="px-10">
          <Input
            id="category"
            name="category"
            className="post-form_input "
            required
            placeholder="Post Category (Programming,Coding,Tech News...)"
          />
        </div>
        {errors.category && (
          <p className="post-form_error">{errors.category}</p>
        )}
      </div>
      {/* Details */}
      <div data-color-mode="light">
        <div className="pt-10">
          <label
            htmlFor="details"
            className="post-form_label !pt-10 !text-white"
          >
            Details
          </label>
        </div>
        <div className="px-10 pb-5">
          <MDEditor
            value={details}
            onChange={setDetails}
            id="details"
            preview="edit"
            height={300}
            style={{ borderRadius: 14, overflow: "hidden" }}
            textareaProps={{
              placeholder: "Prescribe a detailed view of your post",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        </div>
        {errors.details && <p className="post-form_error">{errors.details}</p>}
      </div>
      <div className="px-10 pb-5">
        <Button
          type="submit"
          className="post-form_btn text-white"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
