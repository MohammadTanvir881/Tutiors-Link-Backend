import AppError from "../../app/Error/AppError";
import { Payment } from "../Payment/payment.model";

const CalculateTotalEarnings = async (id: string) => {
  const totalBookings = await Payment.find({ teacher: id });
  if (totalBookings.length === 0) {
    throw new AppError(404, "No Bookings Found");
  }
  // console.log(totalBookings)
  return totalBookings.reduce((sum, b) => sum + (b.price ?? 0), 0);
};

export const TotalEarnings = {
  CalculateTotalEarnings,
};
