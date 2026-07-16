import { Router } from "express";

import {
  createMachine,
  listMachines,
  updateMachine,
  deleteMachine
} from "./machine.controller";

const router = Router();

router.get("/", listMachines);
router.post("/", createMachine);
router.put("/:code", updateMachine);
router.delete("/:code", deleteMachine);

export default router;