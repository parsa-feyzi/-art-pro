import z from "zod";

function isEditorContentEmpty(html: string): boolean {
  if (!html?.trim()) return true;
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0;
}

export const createArticleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Article title is required")
    .max(200, "Title must be 200 characters or less"),
  category: z.string().min(1, "Please select a category"),
  content: z
    .string()
    .refine((html) => !isEditorContentEmpty(html), "Article content is required"),
});
