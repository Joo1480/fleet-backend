import { Router } from "express";

import machineRoutes from "../modules/machine/machine.routes";
import summaryRoutes from "../modules/summary/summary.routes";

const router = Router();

router.get("/health", (_, response) => {
  response.json({
    status: "ok",
  });
});

router.use("/machines", machineRoutes);
router.use("/summary", summaryRoutes);

export default router;
