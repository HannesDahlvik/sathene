import { sql } from 'drizzle-orm'
import { mysqlTable, varchar, text, boolean, datetime, int } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
    id: varchar('id', {
        length: 255
    }).primaryKey(),
    email: text('email'),
    emailVerified: boolean('email_verified').default(false).notNull(),
    username: text('username').notNull(),
    password: text('password').notNull()
})
export type User = typeof user.$inferSelect

export const session = mysqlTable('session', {
    id: varchar('id', {
        length: 255
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 255
    })
        .notNull()
        .references(() => user.id),
    expiresAt: datetime('expires_at').notNull()
})
export type Session = typeof session.$inferSelect

export const emailVerification = mysqlTable('email_verification', {
    id: int('id').primaryKey().autoincrement(),
    code: varchar('code', {
        length: 6
    }).notNull(),
    userId: varchar('user_id', {
        length: 255
    })
        .notNull()
        .references(() => user.id),
    email: text('email').notNull(),
    expiresAt: datetime('expires_at').notNull()
})
export type EmailVerification = typeof session.$inferSelect

export const taskList = mysqlTable('task_list', {
    id: varchar('id', {
        length: 24
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 255
    })
        .notNull()
        .references(() => user.id),
    name: varchar('name', {
        length: 32
    }).notNull(),
    createdAt: datetime('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`)
})
export type TaskList = typeof taskList.$inferSelect

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
    listId: varchar('list_id', {
        length: 24
    }).references(() => taskList.id)
})
export type Task = typeof task.$inferSelect

export const note = mysqlTable('note', {
    id: varchar('id', {
        length: 24
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 255
    })
        .notNull()
        .references(() => user.id),
    title: text('title').notNull(),
    content: text('content'),
    createdAt: datetime('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP`)
})
export type Note = typeof note.$inferSelect
