import { Router } from "express";

import {
  createMachine,
  listMachines,
} from "./machine.controller";

const router = Router();

router.get("/", listMachines);
router.post("/", createMachine);

export default router;