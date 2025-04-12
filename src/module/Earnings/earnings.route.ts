import { Router } from "express";
import { EarningsController } from "./earnings.controller";

const router = Router();

router.get("/:id", EarningsController.getTotalEarnings);

export const EarningsRoutes = router;
