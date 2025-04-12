//! Creating Payment

import { ObjectId } from "mongodb";
import catchAsync from "../../utils/catchAsync";
import { Bookings } from "../Bookings/bookings.model";
import AppError from "../../app/Error/AppError";
import status from "http-status";
import SSLCommerzPayment from "sslcommerz-lts";
import app from "../../app";
import { Payment } from "./payment.model";
import { PaymentServices } from "./payment.services";

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
    success_url: `http://localhost:5000/api/payment/success/${transId}`,
    fail_url: `http://localhost:5000/api/payment/fail/${transId}`,
    cancel_url: "http://localhost:3030/cancel",
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
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        const finalOrder = {
          bookingsId: bookings._id,
          teacher: bookings.teacher,
          student: bookings.student,
          days: bookings.days,
          startTime: bookings.startTime,
          endTime: bookings.endTime,
          price: bookings.price,
          status: bookings.status,
          duration: bookings.duration,
          paymentStatus: bookings.paymentStatus,
          transId,
        };
        console.log(finalOrder);

        const result = await PaymentServices.paymentIntoDb(finalOrder);
        console.log("result", result);
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
  const result = await Payment.updateOne(
    { transId },
    { $set: { paymentStatus: true } }
  );
  if (result.modifiedCount > 0) {
    res.redirect(process.env.SSLCOMMERZ_CLIENT_SUCCESS_REDIRECT_LINK as string);
  }
  // console.log("Payment success hit with transId:", transId);
  // // You can now update your DB, set payment status to 'paid', etc.
  // res.status(200).json({ message: "Payment successful", transId });
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

export const PaymentControllers = {
  createPayment,
  paymentSuccess,
  paymentFail,
};
