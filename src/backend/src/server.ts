import { IncomingMessage, ServerResponse } from 'http'
import express, { Request, Response } from 'express'
import pino from 'pino'
import { ReqId } from 'express-pino-logger'
import expressPino from 'express-pino-logger'
import campaignAPIRoutes from './v1/campaignAPI/routes'
import insightsAPIRoutes from './v1/insightsAPI/routes/insights'
// import redemptionAPIRoutes from './v1/redemptionAPI/routes'
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

// Configure API routes
server.use('/clamp-api/core', campaignAPIRoutes)
server.use('/clamp-api/insights', insightsAPIRoutes)
// server.use('/clamp-api/redemption', redemptionAPIRoutes)

// Serve static files
server.use('/docs', express.static(path.resolve(__dirname, 'public/docs.html')))
server.use(
  '/core-api/spec',
  express.static(path.resolve(__dirname, 'v1/campaignAPI/api-spec/swagger.yaml'))
)
server.use(
  '/insights-api/docs',
  express.static(path.resolve(__dirname, 'public/insights-api-docs.html'))
)
server.use(
  '/insights-api/spec',
  express.static(path.resolve(__dirname, 'v1/insightsAPI/api-spec.yaml'))
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
