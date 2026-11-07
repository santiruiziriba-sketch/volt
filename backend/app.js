import "dotenv/config";
import express from "express";
import helmet from "helmet";
import connectDatabase from "./utils/db.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import requestLogger from "./middlewares/request-logger.js";
import errorLogger from "./middlewares/error-logger.js";
import rateLimiter from "./middlewares/rate-limiter.js";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET debe estar configurado en producción");
}

const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://volt.cebollero.com"],
  }),
);

connectDatabase();

app.use(express.json());

app.use(helmet());

app.use(rateLimiter);

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Volt API is running");
});

app.use("/api", routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
