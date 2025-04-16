import { model, Schema } from "mongoose";
import { Tpayment } from "./Payment.interface";
import { Days } from "../Bookings/bookings.constant";

const paymentSchema = new Schema<Tpayment>(
  {
    bookingsId: {
      type: Schema.Types.ObjectId,
      ref: "Bookings",
      required: true,
    },
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
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    // days: {
    //   type: [String],
    //   enum: Days,
    //   required: true,
    // },
    // startTime: {
    //   type: String,
    //   required: true,
    // },
    // endTime: {
    //   type: String,
    //   required: true,
    // },
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
    transId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<Tpayment>("Payment", paymentSchema);
