import { model, Schema } from "mongoose";
import { TBookings } from "./bookings.interface";
import { Days } from "./bookings.constant";

const bookingsSchema = new Schema<TBookings>(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    days: {
      type: [String],
      enum: Days,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    duration: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Bookings = model<TBookings>("Bookings", bookingsSchema);
