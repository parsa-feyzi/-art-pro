'use client'

import { useState } from "react"
import { Activity } from "react"
import { Control, Controller } from "react-hook-form"
import { ChevronDown } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { CreateArticleInfo } from "@/src/lib/types"
//
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command"
import { Input } from "@/src/components/ui/input"
import { FieldError } from "@/src/components/ui/field"

type category = Record<"title" | "value", string>

const categories: category[] = [
    {
        title: "Calendar",
        value: "calendar"
    },
    {
        title: "Calendar Page",
        value: "calendar-page"
    },
    {
        title: "Mmd Calendar",
        value: "mmd-calendar"
    },
    {
        title: "Calendar",
        value: "calendar 1"
    },
    {
        title: "Calendar Page",
        value: "calendar-page 1"
    },
    {
        title: "Mmd Calendar",
        value: "mmd-calendar 1"
    },
    {
        title: "Calendar",
        value: "calendar 2"
    },
    {
        title: "Calendar Page",
        value: "calendar-page 2"
    },
    {
        title: "Mmd Calendar",
        value: "mmd-calendar 2"
    },
]

interface Props {
    control: Control<CreateArticleInfo>
}

function DashboardArticlesCreateCategorySelector({ control }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => {
                const selected = categories.find((c) => c.value === field.value)

                return (
                    <div className="relative col-span-5 min-h-24">
                        <label className="text-sm text-muted-foreground font-medium cursor-pointer" htmlFor="article-category">
                            Article Category
                        </label>
                        <div className="flex flex-col gap-4">
                            <input
                                type="hidden"
                                name="category"
                                value={field.value}
                                readOnly
                            />
                            <Input
                                id="article-category"
                                value={selected?.title ?? ""}
                                readOnly
                                aria-invalid={fieldState.invalid}
                                className={cn(
                                    "w-full font-medium placeholder:text-tertiary/80 mt-2 py-5.5! focus-visible:ring-0 focus-visible:border-input cursor-pointer bg-sidebar!",
                                    fieldState.invalid && "border-destructive focus-visible:border-destructive"
                                )}
                                placeholder="Choose your article category"
                                onClick={() => setOpen(true)}
                            />
                            <CommandDialog open={open} onOpenChange={setOpen}>
                                <Command>
                                    <CommandInput placeholder="Type a command or search..." />
                                    <CommandList>
                                        <CommandEmpty>No category found.</CommandEmpty>
                                        <CommandGroup heading="Suggestions">
                                            {categories.map(({ title, value }) => (
                                                <CommandItem
                                                    onSelect={() => {
                                                        field.onChange(value)
                                                        setOpen(false)
                                                    }}
                                                    className={cn(
                                                        field.value === value ? "bg-accent text-accent-foreground" : "hover:bg-accent/40",
                                                        "cursor-pointer!"
                                                    )}
                                                    key={value}
                                                >
                                                    {title}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </CommandDialog>
                        </div>
                        <ChevronDown className="text-tertiary/80 absolute top-11 right-4 pointer-events-none" />
                        <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                            <FieldError className="mt-1" errors={[fieldState.error]} />
                        </Activity>
                    </div>
                )
            }}
        />
    )
}

export default DashboardArticlesCreateCategorySelector
