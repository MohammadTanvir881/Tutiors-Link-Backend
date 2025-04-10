import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { BookingsValidation } from "./bookings.validation";
import { BookingsController } from "./bookings.controller";

const router = Router();

// Create Bookings Route
router.post(
  "/",
  validateRequest(BookingsValidation.createOfferedCourseValidationSchema),
  BookingsController.createBookingsIntoDb
);

// Get All Bookings Route
router.get(
  "/",
  BookingsController.getAllBookingsFromDb
);

export const BookingRoutes = router;
