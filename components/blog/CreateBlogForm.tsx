'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogSchema, BlogSchemaType } from "@/schemas/BlogSchema";
import { useSession } from "next-auth/react";
import FormField from "../common/FormField";

const CreateBlogForm = () => {
  const session = useSession();
  const userId = session.data?.user.userId;

  const { register, handleSubmit, formState:{errors}, setValue} = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      userId,
      // title: "",
      // content: "",
      // coverImage: "",
      isPublished: false,
      // tags: []
    }
  });

  const onSubmit: SubmitHandler<BlogSchemaType> = (data) => {
    console.log("data>>>", data);

  }
  return ( 
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]">
      <div>
        <FormField 
          id="title"
          register={register}
          errors={errors}
          placeholder="Blog Title"
          disabled={false}
          inputClassName="border-none text-5xl font-bold bg-transparent px-0 "
        />
      </div>

    </form>
   );
}
 
export default CreateBlogForm;