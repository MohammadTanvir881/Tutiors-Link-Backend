/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Creating Payment

import { ObjectId } from "mongodb";
import catchAsync from "../../utils/catchAsync";
import { Bookings } from "../Bookings/bookings.model";
import AppError from "../../app/Error/AppError";
import status from "http-status";
import SSLCommerzPayment from "sslcommerz-lts";
// import app from "../../app";
import { Payment } from "./payment.model";
import { PaymentServices } from "./payment.services";
import sendResponse from "../../utils/sendResponse";

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

const createPayment = catchAsync(async (req, res) => {
  const transId = new ObjectId().toString();
  const { id } = req.params;
  const bookings = await Bookings.findById(id);
  if (!bookings) {
    throw new AppError(status.NOT_FOUND, "Bookings Not Found");
  }
  // initilize Data
  const data = {
    total_amount: bookings.price,
    currency: "BDT",
    tran_id: transId, // use unique tran_id for each api call
    success_url: `https://assignment-6-backend-six.vercel.app/api/payment/success/${transId}`,
    fail_url: `https://assignment-6-backend-six.vercel.app/api/payment/fail/${transId}`,
    cancel_url: `https://assignment-6-backend-six.vercel.app/api/payment/success/${transId}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  // console.log(bookings);

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(data)
    .then(async (apiResponse: any) => {
      try {
        const GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        const finalOrder = {
          bookingsId: bookings._id,
          teacher: bookings.teacher,
          student: bookings.student,
          date: bookings.date,
          timeSlot: bookings.timeSlot,
          subject: bookings.subject,
          // days: bookings.days,
          // startTime: bookings.startTime,
          // endTime: bookings.endTime,
          price: bookings.price,
          status: bookings.status,
          duration: bookings.duration,
          paymentStatus: bookings.paymentStatus,
          transId,
        };
        // console.log(finalOrder);

        const result = await PaymentServices.paymentIntoDb(finalOrder);
        // console.log("result", result);
        console.log("Redirecting to: ", GatewayPageURL);
      } catch (err) {
        console.error("Error inside SSLCommerz response handler:", err);
        // Optional: You can also handle it gracefully by sending an error response
        res.status(500).json({ message: "Payment initialization failed" });
      }
    })
    .catch((err: any) => {
      console.error("SSLCommerz init failed:", err);
      res.status(500).json({ message: "SSLCommerz init failed" });
    });
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { transId } = req.params;

  // Find the payment entry
  const payment = await Payment.findOne({ transId });

  if (!payment) {
    res.status(404).json({ message: "Payment record not found" });
    return;
  }

  // Update booking status
  const bookingId = payment.bookingsId;
  await Bookings.findByIdAndUpdate(
    bookingId,
    { status: "completed" },
    { new: true }
  );

  // Update payment status
  const result = await Payment.updateOne(
    { transId },
    { $set: { paymentStatus: true } }
  );

  // Redirect after all updates
  if (result.modifiedCount > 0) {
    res.redirect(process.env.SSLCOMMERZ_CLIENT_SUCCESS_REDIRECT_LINK as string);
  } else {
    res
      .status(400)
      .json({ message: "Payment already processed or update failed" });
  }
});

const paymentFail = catchAsync(async (req, res) => {
  const { transId } = req.params;
  const result = await Payment.deleteOne({ transId });
  if (result.deletedCount) {
    res.redirect(process.env.SSLCOMMERZ_CLIENT_FAIL_REDIRECT_LINK as string);
  }

  // console.log("Payment Fail hit with transId:", transId);
  // // You can now update your DB, set payment status to 'paid', etc.
  // res.status(200).json({ message: "Payment Fail", transId });
});

// Schedule of a specific teacher
const scheduleOfSpecificTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PaymentServices.getTheScheduleOfSpecificTeacher(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule Retreived Successfully",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  paymentSuccess,
  paymentFail,
  scheduleOfSpecificTeacher,
};
