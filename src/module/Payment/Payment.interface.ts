import { Types } from "mongoose";
import { TDays } from "../Bookings/bookings.types";

export type Tpayment = {
  bookingsId: Types.ObjectId;
  teacher: Types.ObjectId;
  student: Types.ObjectId;
  days: TDays[];
  startTime: string;
  endTime: string;
  price?: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  duration: number;
  paymentStatus: boolean;
  transId: string;
};
