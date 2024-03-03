'use client'

import { type PropsWithChildren, createContext } from 'react'

import type { User } from '@sathene/api'

type AuthContextType = {
    user: User | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface Props extends PropsWithChildren {
    user: User | null
}

export default function AuthProvider({ children, user }: Props) {
    return (
        <AuthContext.Provider
            value={{
                user
            }}
        >
            <>{children}</>
        </AuthContext.Provider>
    )
}
