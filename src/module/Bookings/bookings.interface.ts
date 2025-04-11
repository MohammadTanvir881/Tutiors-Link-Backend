import { Types } from "mongoose";
import { TDays } from "./bookings.types";

export type TBookings = {
  teacher: Types.ObjectId;
  student: Types.ObjectId;
  days: TDays[];
  startTime: string;
  endTime: string;
  price?: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  duration: number;
  paymentStatus: boolean;
};
