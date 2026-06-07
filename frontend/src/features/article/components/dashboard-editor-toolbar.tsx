'use client'

import { Editor, useEditorState } from '@tiptap/react'
import { 
    AlignCenter, 
    AlignLeft, 
    AlignRight, 
    Bold, 
    Code2, 
    Heading1, 
    Heading2, 
    Heading3, 
    Italic, 
    Link, 
    List, 
    Redo2Icon, 
    Strikethrough, 
    Underline, 
    Undo2Icon,
    ListOrdered,
    ImagePlusIcon,
    TextQuote
} from 'lucide-react'
import DashboardEditorToolbarButton from './dashboard-editor-toolbar-button'
import { menuBarStateSelector } from '@/src/features/article/lib/menu-bar-state-selector'
import DashboardEditorToolbarButtonGroup from './dashboard-editor-toolbar-button-group'

type Props = {
    editor: Editor | null
    onImageUpload: () => void
}

function DashboardEditorToolbar({ editor, onImageUpload }: Props) {
    if (!editor) return null

    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    })

    return (
        <div className="flex items-center flex-wrap gap-3 border-b px-3 py-2 bg-sidebar">
            {/* Undo/Redo */}
            <DashboardEditorToolbarButtonGroup>
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                    icon={<Undo2Icon />}
                    desc='Undo'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                    icon={<Redo2Icon />}
                    desc='Redo'
                />
            </DashboardEditorToolbarButtonGroup>
            
            <div className='w-0.5 bg-input h-6'></div>
            
            {/* Headings */}
            <DashboardEditorToolbarButtonGroup>
                <DashboardEditorToolbarButton
                    onClick={() => {
                        console.log('Toggle H1')
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }}
                    icon={<Heading1 />}
                    isActive={editor.isActive('heading', { level: 1 })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Heading lever 1'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        console.log('Toggle H2')
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }}
                    icon={<Heading2 />}
                    isActive={editor.isActive('heading', { level: 2 })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Heading lever 2'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        console.log('Toggle H3')
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }}
                    icon={<Heading3 />}
                    isActive={editor.isActive('heading', { level: 3 })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Heading lever 3'
                />
                {/* lists */}
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    icon={<List />}
                    isActive={editor.isActive('bulletList')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Bullet list'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    icon={<ListOrdered />}
                    isActive={editor.isActive('orderedList')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Ordered list'
                />
            </DashboardEditorToolbarButtonGroup>
            
            <div className='w-0.5 bg-input h-6'></div>
            
            {/* Text formatting */}
            <DashboardEditorToolbarButtonGroup>
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    icon={<Bold />}
                    isActive={editor.isActive('bold')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Bold'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    icon={<Italic />}
                    isActive={editor.isActive('italic')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Italic'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    icon={<Strikethrough />}
                    isActive={editor.isActive('strike')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Strike'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    icon={<Underline />}
                    isActive={editor.isActive('underline')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Underline'
                />
                <DashboardEditorToolbarButton
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    icon={<Code2 />}
                    isActive={editor.isActive('code')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Code'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        console.log('Toggle Quote')
                        editor.chain().focus().toggleBlockquote().run()
                    }}
                    icon={<TextQuote />}
                    isActive={editor.isActive('blockquote')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Blockquote'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        const url = prompt('Enter URL:')
                        if (url && editor.can().setLink({ href: url })) {
                            editor.chain().focus().setLink({ href: url }).run()
                        }
                    }}
                    icon={<Link />}
                    isActive={editor.isActive('link')}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Link'
                />
            </DashboardEditorToolbarButtonGroup>

            <div className='w-0.5 bg-input h-6'></div>
            
            {/* Text Align */}
            <DashboardEditorToolbarButtonGroup>
                <DashboardEditorToolbarButton
                    onClick={() => {
                        if (editor.can().setTextAlign('left')) {
                            editor.chain().focus().setTextAlign('left').run()
                        }
                    }}
                    icon={<AlignLeft />}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Align left'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        if (editor.can().setTextAlign('center')) {
                            editor.chain().focus().setTextAlign('center').run()
                        }
                    }}
                    icon={<AlignCenter />}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Align center'
                />
                <DashboardEditorToolbarButton
                    onClick={() => {
                        if (editor.can().setTextAlign('right')) {
                            editor.chain().focus().setTextAlign('right').run()
                        }
                    }}
                    icon={<AlignRight />}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Align right'
                />
            </DashboardEditorToolbarButtonGroup>
            
            <div className='w-0.5 bg-input h-6'></div>
            
            {/* Links and Images */}
            <DashboardEditorToolbarButtonGroup>
                
                <DashboardEditorToolbarButton
                    onClick={onImageUpload}
                    icon={<ImagePlusIcon />}
                    disabled={!editorState.canUndo && !editorState.canRedo}
                    desc='Add Image'
                />
            </DashboardEditorToolbarButtonGroup>
        </div>
    )
}

export default DashboardEditorToolbar