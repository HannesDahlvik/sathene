import { Fragment } from 'react'

import Link from 'next/link'

import { getServerSession } from '@sathene/api'
import { Button } from '@sathene/ui-web'

export default async function Home() {
    const { session } = await getServerSession()

    return (
        <div className="relative">
            <div className="absolute h-[120vh] w-full bg-[conic-gradient(from_180deg_at_50%_50%,#000000ff,#000000ff,#a855f7,#ef4444,#a855f7,#fed7aa,#000000ff,#000000ff)] blur-[100px] z-10" />

            <div className="relative z-20">
                <div className="flex flex-col items-center py-52 pb-28 sm:px-16">
                    <div className="text-center w-[90%] sm:w-[450px] lg:w-[600px]">
                        <h1>Maximize Your Day, Minimize Your Effort.</h1>
                    </div>

                    <div className="flex gap-2 mt-12">
                        {session ? (
                            <Fragment>
                                <Button size="xl" variant="secondary" asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button size="xl" variant="secondary" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>

                                <Button size="xl" variant="secondary" asChild>
                                    <Link href="/signup">Signup</Link>
                                </Button>
                            </Fragment>
                        )}
                    </div>
                </div>

                <div className="flex justify-center h-full w-full">
                    <img
                        className="w-2/3 h-full rounded-3xl"
                        src="https://dummyimage.com/1920x1080.jpg"
                        alt="placeholder image"
                    />
                </div>
            </div>

            <div className="h-screen"></div>
        </div>
    )
}
