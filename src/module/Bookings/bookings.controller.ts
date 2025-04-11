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

// get the bookings of specific teacher
const getTheBookingsOfSpecificTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingsServices.getTheBookingsOfSpecificTeacherFromDb(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bookings Retreived successfully",
    data: result,
  });
});

// Confirm Bookings by a teacher
const confirmBookings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingsServices.confirmedBookingsIntoDb(id , req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bookings Confirmed successfully",
    data: result,
  });
});

const cancelBookings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingsServices.cancelBookingsIntoDb(id , req.user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bookings Canceled successfully",
    data: result,
  });
});

export const BookingsController = {
  createBookingsIntoDb,
  getAllBookingsFromDb,
  getTheBookingsOfSpecificTeacher,
  confirmBookings,
  cancelBookings
};
