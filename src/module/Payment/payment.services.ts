import status from "http-status";
import AppError from "../../app/Error/AppError";
import SSLCommerzPayment from "sslcommerz-lts";
import { TBookings } from "../Bookings/bookings.interface";
import { Bookings } from "../Bookings/bookings.model";
import { Tpayment } from "./Payment.interface";
import { ObjectId } from "mongodb";
import { Payment } from "./payment.model";

const paymentIntoDb = async (payload : any) => {
  console.log("payload",payload)
  const result = await Payment.create(payload);
  return result;
};

export const PaymentServices = {
  paymentIntoDb,
};
