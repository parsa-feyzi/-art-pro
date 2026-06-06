import { createArticleSchema } from "@/src/features/article/schemas/article-create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function useCreateArticleForm() {
    return useForm({
        resolver: zodResolver(createArticleSchema),
        mode: "onTouched",
        defaultValues: {
            title: "",
            category: "",
            content: "",
        },
    });
}

export default useCreateArticleForm;
