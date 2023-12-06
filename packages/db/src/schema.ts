import { mysqlTable, bigint, varchar, text } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
    id: varchar('id', {
        length: 15
    }).primaryKey(),
    username: text('username').notNull()
})

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
