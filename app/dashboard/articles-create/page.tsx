'use client'

import { Suspense } from "react"
import { Activity } from "react"
import { Controller } from "react-hook-form"
import { MonitorUp, Save, Trash2Icon } from "lucide-react"
//
import DashboardEditor from "@/components/web/dashboard-components/dashboard-editor-components/dashboard-editor"
import DashboardArticlesCreateCategorySelector from "@/components/web/dashboard-components/dashboard-articles-create-page-components/dashboard-articles-create-category-selector"
import { saveArticleContent } from "./create-article.actions"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import useCreateArticleForm from "@/hooks/useCreateArticleForm"
import { CreateArticleInfo } from "@/lib/types"
import { cn } from "@/lib/utils"

function ArticleCreatePage() {
    const { handleSubmit, control, formState: { isSubmitting } } = useCreateArticleForm()

    const onSubmit = async (data: CreateArticleInfo) => {
        const formData = new FormData()
        formData.set("title", data.title)
        formData.set("category", data.category)
        formData.set("content", data.content)
        await saveArticleContent(formData)
    }

    return (
        <div className="pb-12">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-12 gap-x-12 gap-y-6">
                <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className="col-span-7 min-h-24">
                            <label className="text-sm text-muted-foreground font-medium cursor-pointer" htmlFor="article-title">
                                Article Title
                            </label>
                            <input
                                {...field}
                                id="article-title"
                                aria-invalid={fieldState.invalid}
                                className={cn(
                                    "w-full text-2xl font-bold bg-sidebar outline-none border-b-2 placeholder:text-tertiary/60 placeholder:font-normal border-input focus:border-tertiary mt-2 pt-2 pb-1 px-2 selection:bg-primary selection:text-primary-foreground rounded-t-md",
                                    fieldState.invalid && "border-destructive focus:border-destructive"
                                )}
                                placeholder="Write your article title here"
                            />
                            <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                                <FieldError className="mt-1 px-2" errors={[fieldState.error]} />
                            </Activity>
                        </div>
                    )}
                />
                <DashboardArticlesCreateCategorySelector control={control} />
                <Suspense fallback={<div>Loading editor...</div>}>
                    <DashboardEditor control={control} />
                </Suspense>
                <div className="col-span-12 flex justify-between">
                    <div className="flex gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            Publish Article
                            <MonitorUp />
                        </Button>
                        <Button type="button" variant={"secondary"} onClick={() => console.log("hello")}>
                            Save Article
                            <Save />
                        </Button>
                    </div>
                    <Button type="button" variant={"ghost"}>
                        Delete Changes
                        <Trash2Icon />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ArticleCreatePage
