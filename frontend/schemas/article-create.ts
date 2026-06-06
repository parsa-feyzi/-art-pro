import z from "zod";

function isEditorContentEmpty(html: string) {
    const text = html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ")
        .trim();

    return text.length === 0;
}

export const createArticleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Article title is required")
        .max(200, "Title must be 200 characters or fewer"),
    category: z.string().min(1, "Please select a category"),
    content: z
        .string()
        .refine((value) => !isEditorContentEmpty(value), "Article content is required"),
});
