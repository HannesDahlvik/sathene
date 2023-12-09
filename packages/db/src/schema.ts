import { mysqlTable, bigint, varchar, text, boolean, datetime } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
    id: varchar('id', {
        length: 15
    }).primaryKey(),
    username: text('username').notNull()
})
export type User = typeof user.$inferSelect

export const key = mysqlTable('key', {
    id: varchar('id', {
        length: 255
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    hashedPassword: varchar('hashed_password', {
        length: 255
    })
})
export type Key = typeof key.$inferSelect

export const session = mysqlTable('session', {
    id: varchar('id', {
        length: 128
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15
    })
        .notNull()
        .references(() => user.id),
    activeExpires: bigint('active_expires', {
        mode: 'number'
    }).notNull(),
    idleExpires: bigint('idle_expires', {
        mode: 'number'
    }).notNull()
})
export type Session = typeof session.$inferSelect

export const task = mysqlTable('task', {
    id: varchar('id', {
        length: 24
    }).primaryKey(),
    title: text('title').notNull(),
    details: text('details'),
    completed: boolean('completed').default(false).notNull(),
    deadline: datetime('deadline', {
        mode: 'date'
    }),
    userId: varchar('user_id', {
        length: 15
    })
        .notNull()
        .references(() => user.id)
})
export type Task = typeof task.$inferSelect
