import express, { urlencoded, json, text, Router } from 'express'

import 'reflect-metadata'

import cors from 'cors'
import { registerRoutes } from './app/routes'

export const app: express.Application = express()

// Use body parser to read sent json payloads
app.use(urlencoded({ extended: true }))
app.use(text())
app.use(json({ type: 'application/json', limit: '10kb' }))

app.use(express.static('public'))

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))

// Import routes
const router: Router = Router()
app.use('/v1', router)

registerRoutes(router)

export default app
