import { Types } from "mongoose";
// import { TDays } from "../Bookings/bookings.types";

export type Tpayment = {
  bookingsId: Types.ObjectId;
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
  paymentStatus: boolean;
  transId: string;
};
