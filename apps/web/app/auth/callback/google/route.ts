import { caller } from '~/lib/caller'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (code && state) {
        const { sessionCookie } = await caller.auth.google.callback({ code, state })

        return new Response(null, {
            status: 302,
            headers: {
                Location: '/dashboard',
                'Set-Cookie': sessionCookie.serialize()
            }
        })
    } else {
        return new Response(null, {
            status: 500,
            headers: {
                Location: '/auth'
            }
        })
    }
}
