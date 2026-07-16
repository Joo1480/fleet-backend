import { Router } from "express";

import {
  createMachine,
  listMachines,
  updateMachine,
} from "./machine.controller";

const router = Router();

router.get("/", listMachines);
router.post("/", createMachine);
router.put("/:code", updateMachine);

export default router;