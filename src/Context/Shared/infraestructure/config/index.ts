import { from } from 'env-var'
// import dotenv from 'dotenv'

const env = from(process.env, {})

export class Config {
  nodeEnv: string
  port: string
  databaseUrl: string

  constructor () {
    // const nodeEnv = process.env.NODE_ENV ?? 'dev'
    // if (nodeEnv !== 'prod') {
    //   dotenv.config({ path: '.env.' + nodeEnv })
    // } else {
    //   dotenv.config({ path: '.env' })
    // }

    const config = this.create()
    this.nodeEnv = config.nodeEnv
    this.port = config.port
    this.databaseUrl = config.databaseUrl
  }

  private create () {
    return {
      nodeEnv: env.get('NODE_ENV').required().default('dev').asString(),
      port: env.get('PORT').required().asString(),
      databaseUrl: env.get('DATABASE_URL').required().asString()
    }
  }
}
