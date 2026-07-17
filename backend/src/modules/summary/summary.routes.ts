import { Router } from "express";

import { summaryController } from "./summary.controller";

const summaryRoutes = Router();

summaryRoutes.get("/", summaryController);

export default summaryRoutes;