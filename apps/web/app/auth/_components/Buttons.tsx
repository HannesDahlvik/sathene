'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@sathene/ui-web'

import { Github } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '~/lib/api'

export function AuthButtons() {
    const router = useRouter()

    const utils = api.useUtils()

    api.auth.github.login.useQuery(undefined, {
        enabled: false
    })

    const handleGithubLogin = () => {
        utils.auth.github.login
            .fetch()
            .then((res) => {
                router.push(res.toString())
            })
            .catch(() => {
                toast.error('Failed to login with GitHub')
            })
    }

    return (
        <div className="flex flex-col w-full">
            <Button onClick={handleGithubLogin}>
                <Github size={20} className="mr-2" />
                Github
            </Button>
        </div>
    )
}
