import { Router } from "express";

import machineRoutes from "../modules/machine/machine.routes";

const router = Router();

router.get("/health", (_, response) => {
  response.json({
    status: "ok",
  });
});

router.use("/machines", machineRoutes);

export default router;