import { pgTable, varchar, text, boolean, timestamp, primaryKey } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    username: text('username').notNull()
})
export type User = typeof user.$inferSelect

export const account = pgTable(
    'account',
    {
        providerId: text('provider_id'),
        providerUserId: text('provider_user_id'),
        userId: text('user_id')
            .notNull()
            .references(() => user.id)
    },
    (table) => {
        return {
            pk: primaryKey({
                columns: [table.providerId, table.providerUserId]
            })
        }
    }
)

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp('expires_at', {
        mode: 'date',
        withTimezone: true
    }).notNull()
})
export type Session = typeof session.$inferSelect

export const taskList = pgTable('task_list', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', {
        mode: 'date'
    })
        .notNull()
        .defaultNow()
})
export type TaskList = typeof taskList.$inferSelect

export const task = pgTable('task', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    details: text('details'),
    completed: boolean('completed').default(false).notNull(),
    deadline: timestamp('deadline', {
        mode: 'date'
    }),
    listId: varchar('list_id', {
        length: 24
    }).references(() => taskList.id)
})
export type Task = typeof task.$inferSelect

export const note = pgTable('note', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id),
    title: text('title').notNull(),
    content: text('content'),
    createdAt: timestamp('created_at', {
        mode: 'date'
    })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', {
        mode: 'date'
    })
        .notNull()
        .defaultNow()
})
export type Note = typeof note.$inferSelect
