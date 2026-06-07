'use client'

import { useRef, useCallback } from 'react'
import { Activity } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useEditor, EditorContent } from '@tiptap/react'
import { editorExtensions } from '@/src/features/article/lib/editor-config'
import { CreateArticleInfo } from '@/src/lib/types'
import { cn } from '@/src/lib/utils'
import DashboardEditorToolbar from './dashboard-editor-toolbar'
import { FieldError } from '@/src/components/ui/field'

interface Props {
    control: Control<CreateArticleInfo>
}

function DashboardEditor({ control }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const onContentChangeRef = useRef<(html: string) => void>(() => {})

    const editor = useEditor({
        extensions: editorExtensions,
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4',
            },
        },
        onUpdate({ editor }) {
            onContentChangeRef.current(editor.getHTML())
        },
    })

    const handleImageUpload = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && editor) {
            if (!file.type.startsWith('image/')) {
                console.error('Please upload an image file')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string
                if (imageUrl) {
                    editor.chain().focus().setImage({ src: imageUrl }).run()
                }
            }
            reader.onerror = () => {
                console.error('Failed to read file')
            }
            reader.readAsDataURL(file)
            event.target.value = ''
        }
    }, [editor])

    if (!editor) {
        return <div className="col-span-12">Loading editor...</div>
    }

    return (
        <Controller
            name="content"
            control={control}
            render={({ field, fieldState }) => {
                onContentChangeRef.current = field.onChange

                return (
                    <div id="article-content" className="col-span-12">
                        <input type="hidden" name="content" value={field.value} readOnly />
                        <div
                            className={cn(
                                "relative border rounded-xl overflow-hidden",
                                fieldState.invalid && "border-destructive"
                            )}
                        >
                            <DashboardEditorToolbar
                                editor={editor}
                                onImageUpload={handleImageUpload}
                            />
                            <EditorContent editor={editor} />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                            <FieldError className="mt-2" errors={[fieldState.error]} />
                        </Activity>
                    </div>
                )
            }}
        />
    )
}

export default DashboardEditor
