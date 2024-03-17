'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@sathene/ui-web'

import { Github } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '~/lib/api'

export function AuthButtons() {
    const router = useRouter()

    const utils = api.useUtils()

    const handleLogin = (provider: 'github' | 'google') => {
        utils.auth[provider].login
            .fetch()
            .then(({ url }) => {
                router.push(url.toString())
            })
            .catch(() => {
                toast.error(`Failed to login with ${provider}`)
            })
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => handleLogin('github')}>
                <Github size={20} className="mr-2" />
                Github
            </Button>

            <Button onClick={() => handleLogin('google')}>
                <img src="/google-logo.svg" className="mr-2 h-5 w-5" />
                Google
            </Button>
        </div>
    )
}
