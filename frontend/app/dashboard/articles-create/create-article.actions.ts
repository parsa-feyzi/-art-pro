'use server'

import { createArticleSchema } from "@/schemas/article-create"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function saveArticle(formData: FormData) {
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const content = formData.get('content') as string

  // form data validation
  const formValidation = createArticleSchema.safeParse({ title, category, content });
  if(!formValidation.success){
    throw new Error("data are not valid")
  }
  // user exist validation
  const token = (await cookies()).get("token")
  token || redirect("/login")


  /**
   * Save into DB
   * Prisma Example:
   *
   * await prisma.post.create({
   *   data: {
   *     content
   *   }
   * })
   */

  // console.log(content)

  return {
    success: true,
    message: 'Saved successfully'
  }
}