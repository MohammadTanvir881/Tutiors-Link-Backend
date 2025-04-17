import { Bookings } from "../Bookings/bookings.model";
import { Payment } from "./payment.model";

const paymentIntoDb = async (payload: any) => {
  console.log("payload", payload);
  const bookingId = payload.bookingsId;
  const bookings = await Bookings.findByIdAndUpdate(
    bookingId,
    {
      status: "completed",
    },
    { new: true, runValidators: true }
  );
  const result = await Payment.create(payload);
  return result;
};

export const PaymentServices = {
  paymentIntoDb,
};
