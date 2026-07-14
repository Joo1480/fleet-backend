import { Router } from "express";

import { listMachines } from "./machine.controller";

const router = Router();

router.get("/", listMachines);

export default router;