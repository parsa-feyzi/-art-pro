import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  const { editor } = ctx
  
  // Safe check for editor instance
  if (!editor) {
    return {
      isBold: false,
      canBold: false,
      isItalic: false,
      canItalic: false,
      isStrike: false,
      canStrike: false,
      isCode: false,
      isUnderline: false,
      canCode: false,
      canClearMarks: false,
      isParagraph: false,
      isHeading1: false,
      isHeading2: false,
      isHeading3: false,
      isHeading4: false,
      isHeading5: false,
      isHeading6: false,
      isBulletList: false,
      isOrderedList: false,
      isCodeBlock: false,
      isBlockquote: false,
      canUndo: false,
      canRedo: false,
    }
  }

  return {
    // Text formatting
    isBold: editor.isActive('bold'),
    canBold: editor.can().toggleBold(),
    isItalic: editor.isActive('italic'),
    canItalic: editor.can().toggleItalic(),
    isStrike: editor.isActive('strike'),
    canStrike: editor.can().toggleStrike(),
    isCode: editor.isActive('code'),
    isUnderline: editor.isActive('underline'),
    canCode: editor.can().toggleCode(),
    canClearMarks: editor.can().unsetAllMarks(),

    // Block types
    isParagraph: editor.isActive('paragraph'),
    isHeading1: editor.isActive('heading', { level: 1 }),
    isHeading2: editor.isActive('heading', { level: 2 }),
    isHeading3: editor.isActive('heading', { level: 3 }),
    isHeading4: editor.isActive('heading', { level: 4 }),
    isHeading5: editor.isActive('heading', { level: 5 }),
    isHeading6: editor.isActive('heading', { level: 6 }),

    // Lists and blocks
    isBulletList: editor.isActive('bulletList'),
    isOrderedList: editor.isActive('orderedList'),
    isCodeBlock: editor.isActive('codeBlock'),
    isBlockquote: editor.isActive('blockquote'),

    // History - Fix: Don't call .run() in can() chain
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>