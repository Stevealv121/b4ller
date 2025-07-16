import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
/* eslint-disable */
require('dotenv').config({ path: '.env.local' });

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schemas/*',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});
