'use server'

export async function saveArticleContent(formData: FormData) {
  const content = formData.get('content') as string

  if (!content) {
    throw new Error('Content is required')
  }

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

  console.log(content)

  return {
    success: true,
    message: 'Saved successfully'
  }
}