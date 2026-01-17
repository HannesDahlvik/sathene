<script lang="ts">
    import { Button, Input } from '@sathene/ui'

    import { goto } from '$app/navigation'
    import { authClient } from '$lib/api'
    import { errorHandler, infoHandler } from '$lib/utils'
    import z from 'zod'

    const schema = z.object({
        username: z.string().min(4),
        email: z.email(),
        password: z.string().min(4)
    })

    function handleSignup(e: SubmitEvent) {
        e.preventDefault()

        const form = new FormData(e.target as HTMLFormElement)
        const result = schema.safeParse(Object.fromEntries(form))

        if (!result.success) {
            throw errorHandler(result.error)
        }

        authClient.signUp.email(
            {
                name: result.data.username,
                email: result.data.email,
                password: result.data.password
            },
            {
                onSuccess: () => {
                    infoHandler('Successfully signed up')
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

<h3 class="mb-12 text-center">Sign up</h3>

<form class="space-y-4" onsubmit={handleSignup}>
    <Input label="Username" type="text" placeholder="Username" />
    <Input label="Email" type="email" placeholder="Email" />
    <Input label="Password" type="password" placeholder="Password" />
    <p>Already have an account? <a class="underline" href="/signin">Sign in</a></p>
    <Button type="submit" class="w-full">Sign up</Button>
</form>
