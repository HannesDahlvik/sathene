'use client'

import { type PropsWithChildren, createContext } from 'react'

import type { User, Session } from '@sathene/api'

type AuthContextType = {
    user: User | undefined
    state: 'idle' | 'active' | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null)

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
