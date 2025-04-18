import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { PaymentValidation } from "./payment.validation";
import { PaymentControllers } from "./payment.controller";
import { BookingsValidation } from "../Bookings/bookings.validation";
import auth from "../Auth/auth";

const router = Router();

// Create Bookings Route
router.post("/:id", PaymentControllers.createPayment);
// payment success route
router.post("/success/:transId", PaymentControllers.paymentSuccess);
// payment fail route
router.post("/fail/:transId", PaymentControllers.paymentFail);
// Schedule of a teacher
router.get(
  "/schedule/:id",
  auth("teacher"),
  PaymentControllers.scheduleOfSpecificTeacher
);

export const PaymentRoutes = router;
