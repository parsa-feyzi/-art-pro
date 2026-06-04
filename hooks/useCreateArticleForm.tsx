import { createArticleSchema } from "@/schemas/article-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;

function useCreateArticleForm() {
  return useForm<CreateArticleFormValues>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });
}

export default useCreateArticleForm;
