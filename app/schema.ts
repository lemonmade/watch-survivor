import {sql} from 'drizzle-orm';
import {text, sqliteTable} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id'),
  name: text('name').notNull(),
  createdAt: text('createdAt')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
