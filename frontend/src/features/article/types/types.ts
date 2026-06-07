import { z } from "zod";
import { createArticleSchema } from "@/src/features/article/schemas/article-create";

export type CreateArticleInfo = z.infer<typeof createArticleSchema>;

export interface ArticleSearchContextValue {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}