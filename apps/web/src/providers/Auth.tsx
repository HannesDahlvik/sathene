'use client'

import { type PropsWithChildren, createContext, useContext } from 'react'

import { useRouter } from 'next/navigation'

import type { User, Session } from '@sathene/api'

import { api } from '~/lib/api'

type AuthContextType = {
    user: User | undefined
    state: 'idle' | 'active' | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
    const router = useRouter()
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
    const ctx = useContext(AuthContext)
    return { ...ctx, logout }
}

interface Props extends PropsWithChildren {
    session: Session | null
}

export default function AuthProvider({ children, session }: Props) {
    return (
        <AuthContext.Provider
            value={{
                user: session?.user,
                state: session?.state
            }}
        >
            <>{children}</>
        </AuthContext.Provider>
    )
}
