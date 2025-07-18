import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
/* eslint-disable */
require('dotenv').config({ path: '.env.local' })

const client = postgres(process.env.POSTGRES_URL!)
const db = drizzle({ client })

export default db