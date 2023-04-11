// logging spec definition

import winston from "winston";
import path from "path";
import "winston-daily-rotate-file";

let customColors = {
  warn: "orange",
  error: "red",
  info: "blue",
};

winston.addColors(customColors);

const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: `${path.join("./logs", "/error-%DATE%.log")}`,
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: winston.format.combine(
        winston.format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp({
          format: "YY-MM-DD HH-mm-ss",
        }),
        winston.format.printf((info) => {
          /**
           * majorErrorNotifier(
            "NEW OSE SYSTEMS ERROR",
            `NEW OSE SYSTEMS ${info.timestamp} ${info.level} : ${info.message}`,
            `<h3 style="color: red;">${`[NEW OSE SYSTEMS] ${info.timestamp} ${info.level} : ${info.message}`}</h3>`
          );
           */

          return `[NEW OSE SYSTEMS] ${info.timestamp} ${info.level} : ${info.message}`;
        })
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: `${path.join("./logs", "/warn-%DATE%.log")}`,
      level: "warn",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: winston.format.combine(
        winston.format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.timestamp({
          format: "YY-MM-DD HH-mm-ss",
        }),
        winston.format.printf(
          (info) =>
            `[NEW OSE SYSTEMS] ${info.timestamp} ${info.level} : ${info.message}`
        )
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: `${path.join("./logs", "/info-%DATE%.log")}`,
      level: "info",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      format: winston.format.combine(
        winston.format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.timestamp({
          format: "YY-MM-DD HH-mm-ss",
        }),
        winston.format.printf((info) => {
          return `[NEW OSE SYSTEMS] ${info.timestamp} ${info.level} : ${info.message}`;
        })
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({
          label: "",
        }),
        winston.format.timestamp({
          format: "YY-MM-DD HH-mm-ss",
        }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level} : ${info.message}`
        )
      ),
    })
  );
}

export default logger;
