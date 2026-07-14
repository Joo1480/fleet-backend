import express from "express";

import routes from "./routes";
import { errorHandler } from "./shared/middleware/error-handler";

const app = express();

app.use(express.json());

app.use(routes);

// Deve ser o último middleware
app.use(errorHandler);

export default app;