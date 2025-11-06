import 'dotenv/config'; // carga variables del .env
import { defineConfig, env } from 'prisma/config';
import path from 'node:path';

export default defineConfig({
  //schema: "prisma/schema.prisma",
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
