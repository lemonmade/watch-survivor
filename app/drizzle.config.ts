import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './schema.ts',
  out: './migrations',
  migrations: {
    prefix: 'timestamp',
  },
});
