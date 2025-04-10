import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingsServices } from "./bookings.services";

// Create Bookings
const createBookingsIntoDb = catchAsync(async (req, res) => {
  const result = await BookingsServices.createBookingsIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bookings Created successfully",
    data: result,
  });
});
// Get All Bookings
const getAllBookingsFromDb = catchAsync(async (req, res) => {
  const result = await BookingsServices.getAllBookingsFromDb();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bookings Retreived successfully",
    data: result,
  });
});

export const BookingsController = {
  createBookingsIntoDb,
  getAllBookingsFromDb,
};
