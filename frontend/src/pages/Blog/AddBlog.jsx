import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Dropzone from "react-dropzone";
import slugify from "slugify";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useFetch } from "@/hooks/useFetch";
import { showToast } from "@/helpers/showToast";
import Editor from "@/components/Editor";

const formSchema = z.object({
  title: z.string().min(1, "Title can't be empty"),
  category: z.string().min(1, "Category can't be empty"),
  slug: z.string(),
  blogContent: z.string().min(1, "Blog content can't be empty"),
});

const AddBlog = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);

  const { data: categoryData } = useFetch(`/category/show-all-categories`, {
    method: "GET",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditordata = (event, editor) => {
    const data = editor.getData();
    form.setValue('blogContent', data)
  };

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  const handleFileSelection = (files) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  async function onSubmit(values) {
    // console.log(values);
    // try {
    //       const response = await axiosInstance.post("/category/add", {
    //         name: values.name,
    //         slug: values.slug,
    //       });

    //       showToast("success", response.data.message);
    //       form.reset();
    //     } catch (error) {
    //       const message =
    //         error.response.data.message ||
    //         "Something went wrong. Please try again.";
    //       showToast("error", message);
    //     }
  }

  return (
    <div className="flex-1 h-full px-10 py-8 overflow-y-auto bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto w-full"
      >
        {/* PAGE TITLE */}
        <h2 className="text-4xl font-bold text-teal-400 mb-10">Add New Blog</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-lg">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog title..."
                      className="bg-black/20 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-teal-500 text-xl py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORY */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-lg">
                    Category
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-black/20 border border-gray-700 text-gray-200 focus:border-teal-500">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="bg-gray-900 border border-gray-800">
                      {categoryData?.category?.length > 0 ? (
                        categoryData.category.map((cat) => (
                          <SelectItem
                            key={cat._id}
                            value={cat._id}
                            className="text-gray-100/75"
                          >
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled>No categories found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SLUG */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-lg">Slug</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="bg-black/20 border border-gray-700 text-gray-500 cursor-not-allowed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* FEATURED IMAGE */}
            <div>
              <FormLabel className="text-gray-300 text-lg">
                Featured Image
              </FormLabel>

              <Dropzone onDrop={(accepted) => handleFileSelection(accepted)}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="mt-3 flex justify-center items-center h-56 w-full border-2 border-dashed border-gray-700 hover:border-teal-500 transition rounded-lg cursor-pointer bg-black/10"
                  >
                    <input {...getInputProps()} />

                    {filePreview ? (
                      <img
                        src={filePreview}
                        className="h-full w-full object-cover rounded-lg"
                        alt="Preview"
                      />
                    ) : (
                      <p className="text-gray-400 text-sm">
                        Click or drag an image here
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* BLOG CONTENT */}

            <FormField
              control={form.control}
              name="blogContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-lg">
                    Blog Content
                  </FormLabel>
                  <FormControl>
                    <Editor
                      props={{ initialData: "", onChange: handleEditordata }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 py-3 text-lg font-semibold"
            >
              Submit
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default AddBlog;
