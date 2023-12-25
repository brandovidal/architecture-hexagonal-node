import { from, logger } from 'env-var'
import dotenv from 'dotenv'

const env = from(process.env, {}, logger)

export class Config {
  port?: string
  nodeEnv?: string
  databaseUrl?: string

  constructor () {
    this.getFromEnvFile()
    this.setEnvironmentVariables()
  }

  private getEnv (name: string) {
    return env.get(name)
  }

  private getNodeEnvValue (): string {
    return this.getEnv('NODE_ENV').default('dev').asString()
  }

  private getPortValue (): string {
    return this.getEnv('PORT').required().asString()
  }

  private getDatabaseUrlValue (): string {
    return this.getEnv('DATABASE_URL').required().asString()
  }

  private getFromEnvFile () {
    const nodeEnv = this.getNodeEnvValue()
    if (nodeEnv !== 'prod') {
      dotenv.config({ path: '.env.' + nodeEnv })
    } else {
      dotenv.config({ path: '.env' })
    }
  }

  private setEnvironmentVariables () {
    this.nodeEnv = this.getNodeEnvValue()
    this.port = this.getPortValue()
    this.databaseUrl = this.getDatabaseUrlValue()
  }

  toPrimitives () {
    return {
      nodeEnv: this.nodeEnv,
      port: this.port,
      databaseUrl: this.databaseUrl
    }
  }
}
