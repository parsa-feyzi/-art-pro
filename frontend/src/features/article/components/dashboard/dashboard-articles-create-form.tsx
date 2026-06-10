'use client'

import { Suspense } from "react"
import { Activity } from "react"
import { Controller } from "react-hook-form"
import { PlayCircle, RotateCcw, Save, Trash2Icon, Upload } from "lucide-react"
//
import DashboardEditor from "@/src/features/article/components/dashboard/dashboard-editor"
import DashboardArticlesCreateCategorySelector from "@/src/features/article/components/dashboard/dashboard-articles-create-category-selector"
import { saveArticle } from "@/src/features/article/server-actions/create-article.actions"
import { Button } from "@/src/components/ui/button"
import { FieldError } from "@/src/components/ui/field"
import { CreateArticleInfo } from "../../types/types"
import { cn } from "@/src/lib/utils"
import useCreateArticleForm from "@/src/features/article/hooks/useCreateArticleForm"
import { Input } from "@/src/components/ui/input"
import DashboardEditorSkeleton from "../skeletons/dashboard-editor-skeleton"


function DashboardArticlesCreateForm() {
    const { handleSubmit, control, formState: { isSubmitting, isSubmitted } } = useCreateArticleForm()

    const onSubmit = async (data: CreateArticleInfo) => {
        const formData = new FormData()
        formData.set("title", data.title)
        formData.set("category", data.category)
        formData.set("content", data.content)
        await saveArticle(formData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-12 gap-x-4 gap-y-0">
            {/* title input */}
            <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                    <div className="lg:col-span-7 sm:col-span-6 col-span-12 min-h-24">
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
            <Suspense fallback={<DashboardEditorSkeleton />}>
                <DashboardEditor control={control} />
            </Suspense>
            <div className="col-span-12 flex sm:gap-4 gap-2 mt-6">
                <div className="sm:w-auto w-full">
                    <Button formAction={() => console.log("hello")} className="sm:inline-flex hidden">
                        Publish Article
                        <PlayCircle />
                    </Button>
                    <Button formAction={() => console.log("hello")} size="lg" className="sm:hidden inline-flex w-full">
                        Publish Article
                        <PlayCircle />
                    </Button>
                </div>
                <div>
                    <Button type="submit" variant={"secondary"} disabled={isSubmitting} className="sm:inline-flex hidden">
                        Save as Draft
                        <Save />
                    </Button>
                    <Button type="submit" variant={"secondary"} size="icon-lg" disabled={isSubmitting} className="sm:hidden inline-flex">
                        <Save />
                    </Button>
                </div>
                <div className="sm:w-full flex justify-end">
                    <Button type="button" variant={"secondary"} className="text-red-700 dark:text-red-400 sm:inline-flex hidden" >
                        Remove Changes
                        <RotateCcw />
                    </Button>
                    <Button type="button" variant={"secondary"} size="icon-lg" className="text-red-700 dark:text-red-400 sm:hidden inline-flex" >
                        <RotateCcw />
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default DashboardArticlesCreateForm