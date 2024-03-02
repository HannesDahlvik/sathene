import { cookies } from 'next/headers'

import { db, user } from '@sathene/db'

import { auth } from '../auth/lucia'
import { generateEmailVerificationCode, getServerSession } from '../auth/utils'
import { satheneRouter } from '../root'
import { authedProcedure, procedure, router, t } from '../trpc'
import { TRPCError } from '@trpc/server'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { z } from 'zod'

export const authRouter = router({
    login: procedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ input }) => {
            const existingUser = await db.query.user
                .findFirst({
                    where: (fields, operators) => operators.eq(fields.email, input.email)
                })
                .catch((err) => {
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: err.message
                    })
                })

            if (!existingUser) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Incorrect email or password'
                })
            }

            const validPassword = await new Argon2id().verify(existingUser.password, input.password)
            if (!validPassword) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Incorrect email or password'
                })
            }

            const session = await auth.createSession(existingUser.id, {})
            const sessionCookie = auth.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

            return session
        }),
    signup: procedure
        .input(
            z.object({
                username: z.string().min(3),
                email: z.string().email(),
                password: z.string().min(6)
            })
        )
        .mutation(async ({ input }) => {
            const hashedPassword = await new Argon2id().hash(input.password)
            const userId = generateId(25)

            try {
                await db
                    .insert(user)
                    .values({
                        id: userId,
                        email: input.email,
                        emailVerified: false,
                        username: input.username,
                        password: hashedPassword
                    })
                    .catch((err) => {
                        throw new TRPCError({
                            code: 'INTERNAL_SERVER_ERROR',
                            message: err.message
                        })
                    })

                /* const verificationCode = await generateEmailVerificationCode(userId, input.email)
                await sendVerificationCode(input.email, verificationCode) */

                const session = await auth.createSession(userId, {})
                const sessionCookie = auth.createSessionCookie(session.id)
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

                const caller = t.createCallerFactory(satheneRouter)({
                    type: 'rsc'
                })
                await caller.task.list
                    .create({
                        name: 'My Tasks'
                    })
                    .catch((err) => {
                        throw new TRPCError({
                            code: 'INTERNAL_SERVER_ERROR',
                            message: err.message
                        })
                    })

                return null
            } catch (err) {
                console.error(err)

                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'An unkown error occured'
                })
            }
        }),
    logout: authedProcedure.mutation(async ({ ctx }) => {
        const { session } = await getServerSession()

        if (!session) {
            throw new TRPCError({
                code: 'UNAUTHORIZED'
            })
        }

        await auth.invalidateSession(ctx.session.id)

        const sessionCookie = auth.createBlankSessionCookie()
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return null
    })
})
