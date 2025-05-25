/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from 'express'

import winston, { Logger } from 'winston'

const formatLogMessage = winston.format.printf(
  ({ timestamp, level, message }) => {
    const logMessage =
      typeof message === 'object' ? JSON.stringify(message) : message
    return `${timestamp} [${level.toUpperCase()}]: ${logMessage}`
  },
)

const newLogger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), formatLogMessage),
  transports: [
    new winston.transports.File({ filename: 'logs/api-logs.txt' }), // Logs saved to api-logs.txt
    new winston.transports.Console(), // Logs also output to the console
  ],
})

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.on('finish', () => {
    const logMessage = `IP: ${req.ip} ${req.method} ${
      req.originalUrl
    } - Status: ${res.statusCode} - Body: ${JSON.stringify(req.body)}`

    newLogger.info(logMessage) // Log the API request
  })
  next() // Pass control to the next middleware or route handler
}

export const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), formatLogMessage),
  transports: [
    new winston.transports.File({ filename: 'logs/error-logs.txt' }), // Log errors to error-logs.txt
    new winston.transports.Console(), // Logs also output to the console
  ],
})

export const errorRequestLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode // Default to 500 for unhandled errors
  const errorMessage = `${req.method} ${req.url} - Error: ${err.message} - Status: ${statusCode}`
  logger.error(errorMessage) // Log errors separately
  next() // Pass control to the next middleware or route handler
}
