'use client'

import { Suspense } from "react"
import { Activity } from "react"
import { Controller } from "react-hook-form"
import { Save, Trash2Icon, Upload } from "lucide-react"
//
import DashboardEditor from "@/components/web/dashboard-components/dashboard-editor-components/dashboard-editor"
import DashboardArticlesCreateCategorySelector from "@/components/web/dashboard-components/dashboard-articles-create-page-components/dashboard-articles-create-category-selector"
import { saveArticle } from "./create-article.actions"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { CreateArticleInfo } from "@/lib/types"
import { cn } from "@/lib/utils"
import useCreateArticleForm from "@/hooks/useCreateArticleForm"
import { Input } from "@/components/ui/input"

function ArticleCreatePage() {
    const { handleSubmit, control, formState: { isSubmitting, isSubmitted } } = useCreateArticleForm()

    const onSubmit = async (data: CreateArticleInfo) => {
        const formData = new FormData()
        formData.set("title", data.title)
        formData.set("category", data.category)
        formData.set("content", data.content)
        await saveArticle(formData)
    }

    return (
        <div className="pb-12">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-12 gap-x-12 gap-y-6">
                {/* title input */}
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="col-span-7 min-h-24">
                            <label className="text-sm text-muted-foreground font-medium cursor-pointer" htmlFor="article-title">
                                Article Title
                            </label>
                            <Input
                                {...field}
                                id="article-title"
                                aria-invalid={isSubmitted && fieldState.invalid}
                                className={cn(
                                    "w-full form-medium placeholder:font-medium placeholder:text-tertiary/80 h-10 bg-sidebar outline-none mt-2 py-5.5! focus-visible:ring-0 focus-visible:border-input cursor-pointer selection:bg-primary selection:text-primary-foreground rounded-t-md",
                                    (isSubmitted && fieldState.invalid) ? "border-destructive focus:border-destructive" : ""
                                )}
                                placeholder="Write your article title here"
                            />
                            <Activity mode={(isSubmitted && fieldState.invalid) ? "visible" : "hidden"}>
                                <FieldError className="mt-1 px-2" errors={[fieldState.error]} />
                            </Activity>
                        </div>
                    )}
                />
                {/* category selector */}
                <DashboardArticlesCreateCategorySelector control={control} />
                {/* editor */}
                <Suspense fallback={<div>Loading editor...</div>}>
                    <DashboardEditor control={control} />
                </Suspense>
                <div className="col-span-12 flex justify-between">
                    <div className="flex gap-4">
                        <Button formAction={() => console.log("hello")} >
                            Publish Article
                            <Upload />
                        </Button>
                        <Button type="submit" variant={"secondary"} disabled={isSubmitting}>
                            Save Article as Draft
                            <Save />
                        </Button>
                    </div>
                    <Button type="button" variant={"ghost"} className="transition-[color] duration-150 hover:text-red-500" >
                        Delete Changes
                        <Trash2Icon />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ArticleCreatePage
