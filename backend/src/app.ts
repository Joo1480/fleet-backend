import cors from "cors";
import express from "express";

import routes from "./routes";
import { errorHandler } from "./shared/middleware/error-handler";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;