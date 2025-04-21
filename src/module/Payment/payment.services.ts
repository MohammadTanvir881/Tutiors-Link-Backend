import status from "http-status";
import AppError from "../../app/Error/AppError";
import { Bookings } from "../Bookings/bookings.model";
import { Payment } from "./payment.model";

const paymentIntoDb = async (payload: any) => {
  console.log("payload", payload);
  // const bookingId = payload.bookingsId;
  // const bookings = await Bookings.findByIdAndUpdate(
  //   bookingId,
  //   {
  //     status: "completed",
  //   },
  //   { new: true, runValidators: true }
  // );
  const result = await Payment.create(payload);
  return result;
};



// Get the Bookings of a specfic teacher
const getTheScheduleOfSpecificTeacher = async (id: string) => {
  const result = await Payment.find({ teacher: id });
  if (result.length === 0) {
    throw new AppError(status.NOT_FOUND, "No Schedule Found");
  }
  // console.log(result);
  return result;
};

export const PaymentServices = {
  paymentIntoDb,
  getTheScheduleOfSpecificTeacher,
};
