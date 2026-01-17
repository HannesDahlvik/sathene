<script lang="ts">
    import { Button, Input } from '@sathene/ui'

    import { goto } from '$app/navigation'
    import { authClient } from '$lib/api'
    import { errorHandler, infoHandler } from '$lib/utils'
    import z from 'zod'

    const schema = z.object({
        email: z.email(),
        password: z.string().min(4)
    })

    function handleSignin(e: SubmitEvent) {
        e.preventDefault()

        const form = new FormData(e.target as HTMLFormElement)
        const result = schema.safeParse(Object.fromEntries(form))

        if (!result.success) {
            throw errorHandler(result.error)
        }

        authClient.signIn.email(
            {
                email: result.data.email,
                password: result.data.password
            },
            {
                onSuccess: () => {
                    infoHandler('Successfully signed in')
                    setTimeout(() => {
                        goto('/dashboard', {
                            replaceState: true
                        })
                    }, 100)
                },
                onError: ({ error }) => {
                    errorHandler(error)
                }
            }
        )
    }
</script>

<h3 class="mb-12 text-center">Sign in</h3>

<form class="space-y-4" onsubmit={handleSignin}>
    <Input label="Email" type="email" placeholder="Email" />
    <Input label="Password" type="password" placeholder="Password" />
    <p>Don't have an account? <a class="underline" href="/signup">Sign up</a></p>
    <Button type="submit" class="w-full">Sign in</Button>
</form>
