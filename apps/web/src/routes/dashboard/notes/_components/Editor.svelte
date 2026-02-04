<script lang="ts">
    import { onDestroy, onMount } from 'svelte'

    import { Editor } from '@tiptap/core'
    import Bold from '@tiptap/extension-bold'
    import Document from '@tiptap/extension-document'
    import Heading from '@tiptap/extension-heading'
    import Italic from '@tiptap/extension-italic'
    import { BulletList, ListItem } from '@tiptap/extension-list'
    import Paragraph from '@tiptap/extension-paragraph'
    import Text from '@tiptap/extension-text'
    import Underline from '@tiptap/extension-underline'
    import { Placeholder } from '@tiptap/extensions'

    import EditorToolbar from './EditorToolbar.svelte'

    interface Props {
        onEditor: (editor: Editor | null) => void
        noteHTML?: string | null
    }

    let { onEditor, noteHTML }: Props = $props()

    let element = $state<HTMLDivElement | null>(null)
    let editor = $state<Editor | null>(null)

    onMount(() => {
        editor = new Editor({
            element,
            content: noteHTML || '',
            extensions: [
                Document,
                Text,
                Paragraph,
                Bold,
                Italic,
                Underline,
                BulletList,
                ListItem,
                Heading.configure({
                    levels: [1, 2]
                }),
                Placeholder.configure({
                    placeholder: 'Take a note...'
                })
            ],
            editorProps: {
                attributes: {
                    class: 'prose prose-neutral! dark:prose-invert! focus:outline-none'
                }
            },
            onTransaction: ({ editor }) => {
                editor = editor
                onEditor(editor)
            }
        })
        onEditor(editor)

        let editorDiv = document.querySelector('.ProseMirror') as HTMLDivElement
        if (editorDiv) {
            editorDiv.classList.remove('ProseMirror')
        }
    })

    onDestroy(() => {
        editor?.destroy()
    })
</script>

<div class="relative">
    {#if editor}
        <EditorToolbar {editor} showSaveButton={false} />
    {/if}

    <div class="mt-4" bind:this={element}></div>
</div>
