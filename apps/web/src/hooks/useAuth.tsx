import { useContext } from 'react'

import { useRouter } from 'next/navigation'

import { api } from '~/lib/api'
import { AuthContext } from '~/providers/Auth'

export function useAuth() {
    const router = useRouter()
    const ctx = useContext(AuthContext)

    const logoutMutation = api.auth.logout.useMutation()

    const logout = () => {
        logoutMutation.mutate(undefined, {
            onError: (err) => console.error(err),
            onSuccess: () => {
                router.replace('/')
                router.refresh()
            }
        })
    }

    return { ...ctx, logout }
}
