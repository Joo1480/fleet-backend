import cors from "cors";
import express from "express";

import routes from "./routes";
import { errorHandler } from "./shared/middleware/error-handler";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;