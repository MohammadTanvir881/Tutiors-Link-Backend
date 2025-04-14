import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { reviewValidation } from "./reviews.validation";
import { ReviewControllers } from "./review.controller";

const router = Router();

router.post(
  "/",
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewControllers.createReview
);

export const ReviewRoutes = router;
