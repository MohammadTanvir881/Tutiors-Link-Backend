import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { BookingsValidation } from "./bookings.validation";
import { BookingsController } from "./bookings.controller";
import auth from "../Auth/auth";

const router = Router();

// Create Bookings Route
router.post(
  "/",
  validateRequest(BookingsValidation.createOfferedCourseValidationSchema),
  BookingsController.createBookingsIntoDb
);

// Get All Bookings Route
router.get("/", BookingsController.getAllBookingsFromDb);

// Get The Bookings Of A Specific Teacher
router.get("/teacher/:id", BookingsController.getTheBookingsOfSpecificTeacher);

// Confirmed Bookings By A Teacher
router.patch(
  "/confirm/:id",
  auth("teacher"),
  BookingsController.confirmBookings
);
// Cancel Bookings By A Teacher
router.patch("/cancle/:id", auth("teacher"), BookingsController.cancelBookings);

export const BookingRoutes = router;
