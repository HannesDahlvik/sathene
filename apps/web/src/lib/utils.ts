import { toast } from 'svelte-sonner'

function errorHandler(error: Error) {
    toast.error(error.message, {
        duration: 5000
    })
}

function infoHandler(message: string) {
    toast.info(message, {
        duration: 5000
    })
}

export { errorHandler, infoHandler }
