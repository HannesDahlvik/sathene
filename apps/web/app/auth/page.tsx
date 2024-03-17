import { redirect } from 'next/navigation'

import { getServerSession } from '@sathene/api'

import { AuthButtons } from './_components/Buttons'

export default async function AuthPage() {
    const { session } = await getServerSession()

    if (session) return redirect('/dashboard')

    return (
        <div className="flex flex-col items-center pt-40 h-screen">
            <div className="flex flex-col justify-center items-center w-[400px] bg-secondary p-12 rounded-lg border shadow-xl">
                <div className="flex flex-1 flex-col justify-center items-center w-full">
                    <h2 className="mb-8">Login</h2>

                    <AuthButtons />
                </div>
            </div>
        </div>
    )
}
