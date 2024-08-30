import winston from 'winston'

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => `[${info.level} ${info.timestamp}]: ${info.message}`)
)

export const logger = winston.createLogger({
  level: 'info',
  // defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), alignColorsAndTime) }), // 输出到控制台
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   )
// }
