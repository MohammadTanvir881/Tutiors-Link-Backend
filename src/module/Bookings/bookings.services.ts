import mongoose from "mongoose";
import { Teacher } from "../Teacher/teacher.model";
import { TBookings } from "./bookings.interface";
import { Bookings } from "./bookings.model";
import AppError from "../../app/Error/AppError";
import status from "http-status";
import { timeDifference } from "./timeDifference";

// Create Bookings
const createBookingsIntoDb = async (payload: TBookings) => {
  // console.log(payload);

  // Time Difference In Hourse
  const diffInHours = await timeDifference(payload.startTime, payload.endTime);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // ASSIGNED SCHEDULE
    const assignedSchedule = await Bookings.find({
      teacher: payload.teacher,
      days: { $in: payload.days },
    }).select("days startTime endTime");

    console.log("assigned schidule", assignedSchedule);

    const newSchedule = {
      days: payload.days,
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    assignedSchedule.forEach((schedule) => {
      const existingStartTime = new Date(`2023-10-01T${schedule.startTime}`);
      const existingEndTime = new Date(`2023-10-01T${schedule.endTime}`);
      const newStartTime = new Date(`2023-10-01T${newSchedule.startTime}`);
      const newEndTime = new Date(`2023-10-01T${newSchedule.endTime}`);

      if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
        throw new AppError(
          status.CONFLICT,
          "Teacher is already booked for this time slot . Please choose a different time or day."
        );
      }
    });

    // Check if the teacher is available
    const teacher = await Teacher.findById(payload.teacher);

    if (!teacher) {
      throw new Error("Teacher not found");
    }
    payload.price = teacher.hourlyRate! * diffInHours * payload.duration;
    const result = await Bookings.create(payload);
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// Get All Bookings
const getAllBookingsFromDb = async () => {
  const result = await Bookings.find();
  return result;
};

export const BookingsServices = {
  createBookingsIntoDb,
  getAllBookingsFromDb,
};
