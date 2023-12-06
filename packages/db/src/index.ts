import { env } from '@sathene/env'

import * as schema from './schema'
import { Connection as PlanetscaleConnection, connect } from '@planetscale/database'
import { drizzle as mysqlDrizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import {
    drizzle as planetscaleDrizzle,
    type PlanetScaleDatabase
} from 'drizzle-orm/planetscale-serverless'
import mysql, { type Connection as MySQLConnection } from 'mysql2/promise'

let mysqlConnection: MySQLConnection
let planetscaleConnection: PlanetscaleConnection
let db: PlanetScaleDatabase<typeof schema> | MySql2Database<typeof schema>

if (env.NODE_ENV === 'production') {
    planetscaleConnection = connect({
        url: env.DATABASE_URL
    })
    db = planetscaleDrizzle(planetscaleConnection, {
        schema
    })
} else {
    mysqlConnection = await mysql.createConnection({
        uri: env.DATABASE_URL
    })
    db = mysqlDrizzle(mysqlConnection, {
        mode: 'default',
        schema
    })
}

export { db, mysqlConnection, planetscaleConnection }
