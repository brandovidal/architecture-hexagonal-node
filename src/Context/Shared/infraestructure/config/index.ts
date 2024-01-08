import { from } from 'env-var'

const env = from(process.env, {})

export class Config {
  nodeEnv: string
  port: string
  databaseUrl: string

  constructor () {
    this.nodeEnv = env.get('NODE_ENV').required().default('dev').asString()
    this.port = env.get('PORT').required().default('5000').asString()
    this.databaseUrl = env.get('DATABASE_URL').required().asString()
  }
}
