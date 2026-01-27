<script lang="ts">
    import { Button, Separator } from '@sathene/ui'

    import { api } from '$lib/api'
    import { errorHandler, infoHandler } from '$lib/utils'
    import {
        BoldIcon,
        CaseSensitiveIcon,
        Heading1Icon,
        Heading2Icon,
        ItalicIcon,
        UnderlineIcon
    } from '@lucide/svelte'
    import { Editor } from '@tiptap/core'

    interface Props {
        editor: Editor
        noteId?: string
        title?: string
        showSaveButton: boolean
    }

    let { editor, noteId, title, showSaveButton }: Props = $props()

    function handleSaveNote() {
        if (!noteId) throw errorHandler(new Error('Note ID is required to save the note.'))

        const content = editor.getHTML()

        api.note.edit
            .mutate({
                noteId,
                title,
                content
            })
            .then(() => {
                infoHandler('Saved note!')
            })
            .catch((err) => {
                throw errorHandler(err)
            })
    }
</script>

<div class="bg-accent sticky top-0 z-50 mb-2 flex items-center space-x-2 rounded-md border p-2">
    <Button
        size="icon"
        variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    >
        <Heading1Icon />
    </Button>
    <Button
        size="icon"
        variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    >
        <Heading2Icon />
    </Button>
    <Button
        size="icon"
        variant={editor.isActive('paragraph') ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().setParagraph().run()}
    >
        <CaseSensitiveIcon />
    </Button>

    <Separator orientation="vertical" class="mx-2 h-6" />

    <Button
        size="icon"
        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().toggleBold().run()}
    >
        <BoldIcon />
    </Button>
    <Button
        size="icon"
        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().toggleItalic().run()}
    >
        <ItalicIcon />
    </Button>
    <Button
        size="icon"
        variant={editor.isActive('underline') ? 'secondary' : 'ghost'}
        onclick={() => editor.chain().focus().toggleUnderline().run()}
    >
        <UnderlineIcon />
    </Button>

    {#if showSaveButton}
        <Separator orientation="vertical" class="mx-2 h-6" />

        <div class="ml-auto">
            <Button variant="default" onclick={handleSaveNote}>Save</Button>
        </div>
    {/if}
</div>
