import { IncomingMessage } from 'http'
import express, { Request, Response } from 'express'
import pino from 'pino'
import { ReqId } from 'express-pino-logger'
import expressPino from 'express-pino-logger'
import campaignAPIRoutes from './v1/campaignAPI/routes'
import insightsAPIRoutes from './v1/insightsAPI/routes/insights'
import gamificationAPIRoutes from './v1/gamificationAPI/routes'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import path from 'path'
import connectToMongoDB from './db/mongostore'

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 8080
const logger = pino({ level: process.env.LOG_LEVEL || 'trace' })
const expressLogger = expressPino({
  logger,
  genReqId: (req: IncomingMessage): ReqId => 'clamp-api-req---' + uuidv4(),
})

const server = express()
server.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
server.use(express.json())
server.use(expressLogger)

// Campaign API
server.use('/clamp-api/core', campaignAPIRoutes)
server.use('/docs', express.static(path.resolve(__dirname, 'public/docs.html')))
server.use(
  '/core-api/spec',
  express.static(path.resolve(__dirname, 'v1/campaignAPI/api-spec/swagger.yaml'))
)

// Insights API
server.use('/clamp-api/insights', insightsAPIRoutes)
server.use(
  '/insights-api/docs',
  express.static(path.resolve(__dirname, 'public/insights-api-docs.html'))
)
server.use(
  '/insights-api/spec',
  express.static(path.resolve(__dirname, 'v1/insightsAPI/api-spec.yaml'))
)

// Gamification API
server.use('/clamp-api/gamification', gamificationAPIRoutes)
server.use(
  '/gamification-api/docs',
  express.static(path.resolve(__dirname, 'public/gamification-api-docs.html'))
)
server.use(
  '/gamification-api/spec',
  express.static(path.resolve(__dirname, 'v1/gamificationAPI/api-spec.yaml'))
)

server.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'Clamp API. Status OK' })
})

connectToMongoDB().then(() => {
  server.listen(PORT, (err?: Error) => {
    if (err) {
      throw err
    }
    console.log(`> Ready on http://localhost:${PORT}....`)
  })
})
