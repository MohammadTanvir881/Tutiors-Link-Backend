
import { Types } from "mongoose";
// import { TDays } from "./bookings.types";

export type TBookings = {
  teacher: Types.ObjectId;
  student: Types.ObjectId;
  date: string;
  timeSlot: string;
  subject: string;
  // days: TDays[];
  // startTime: string;
  // endTime: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  duration: string;
  paymentStatus?: boolean;
};
