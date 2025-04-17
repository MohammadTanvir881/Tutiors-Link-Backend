import mongoose from "mongoose";
import { Teacher } from "../Teacher/teacher.model";
import { TBookings } from "./bookings.interface";
import { Bookings } from "./bookings.model";
import AppError from "../../app/Error/AppError";
import status from "http-status";
import { timeDifference } from "./timeDifference";
import { sendEmail } from "../../utils/sendEmail";
import { Student } from "../Student/student.model";

// Create Bookings
const createBookingsIntoDb = async (payload: TBookings) => {
  console.log(payload);

  // Time Difference In Hourse
  // const diffInHours = await timeDifference(payload.startTime, payload.endTime);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // ASSIGNED SCHEDULE
    // const assignedSchedule = await Bookings.find({
    //   teacher: payload.teacher,
    //   days: { $in: payload.days },
    // }).select("days startTime endTime");

    // console.log("assigned schidule", assignedSchedule);

    // const newSchedule = {
    //   days: payload.days,
    //   startTime: payload.startTime,
    //   endTime: payload.endTime,
    // };

    // assignedSchedule.forEach((schedule) => {
    //   const existingStartTime = new Date(`2023-10-01T${schedule.startTime}`);
    //   const existingEndTime = new Date(`2023-10-01T${schedule.endTime}`);
    //   const newStartTime = new Date(`2023-10-01T${newSchedule.startTime}`);
    //   const newEndTime = new Date(`2023-10-01T${newSchedule.endTime}`);

    //   if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
    //     throw new AppError(
    //       status.CONFLICT,
    //       "Teacher is already booked for this time slot . Please choose a different time or day."
    //     );
    //   }
    // });

    // Check if the teacher is available
    const teacher = await Teacher.findById(payload.teacher);

    if (!teacher) {
      throw new Error("Teacher not found");
    }
    // payload.price = teacher.hourlyRate! * diffInHours * payload.duration;
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

// Get the Bookings of a specfic teacher
const getTheBookingsOfSpecificTeacherFromDb = async (id: string) => {
  const result = await Bookings.find({ teacher: id });
  if (result.length === 0) {
    throw new AppError(status.BAD_GATEWAY, "No Bookings Found");
  }
  console.log(result);
  return result;
};

// Get the Bookings of a specfic teacher
const getTheBookingsOfSpecificStudentFromDb = async (id: string) => {
  const result = await Bookings.find({ student: id });
  if (result.length === 0) {
    throw new AppError(status.BAD_GATEWAY, "No Bookings Found");
  }
  console.log(result);
  return result;
};

// confirmed bookings by a teacher into db
const confirmedBookingsIntoDb = async (Id: string, userData: any) => {
  const bookings = await Bookings.findById(Id);
  if (!bookings) {
    throw new AppError(404, "Bookings Not Found");
  }

  const teacher = await Teacher.findById(bookings.teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const student = await Student.findById(bookings.student).select("email");
  console.log("student", student);
  if (!student) {
    throw new AppError(404, "Student Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Bookings , You Cant Confirm It"
    );
  }

  // console.log(bookings);
  // console.log(teacher);
  // console.log(userData);

  const result = await Bookings.findByIdAndUpdate(
    Id,
    { status: "confirmed" },
    { new: true, runValidators: true }
  );
  sendEmail(
    student.email,
    "The Teacher Accepted Your  For Tutoring",
    `The Teacher ${teacher.name} Accepted Your Request For Tutoring . Go to your dashboard to done Further procedure`
  );
  return result;
};

const cancelBookingsIntoDb = async (Id: string, userData: any) => {
  const bookings = await Bookings.findById(Id);
  if (!bookings) {
    throw new AppError(404, "Bookings Not Found");
  }

  const teacher = await Teacher.findById(bookings.teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const student = await Student.findById(bookings.student).select("email");
  // console.log("student", student);
  if (!student) {
    throw new AppError(404, "Student Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Bookings , You Cant Confirm It"
    );
  }

  // console.log(bookings);
  // console.log(teacher);
  // console.log(userData);

  const result = await Bookings.findByIdAndUpdate(
    Id,
    { status: "canceled" },
    { new: true, runValidators: true }
  );
  sendEmail(
    student.email,
    "The Teacher Canceled Your  For Tutoring",
    `The Teacher ${teacher.name} Canceled Your Request For Tutoring`
  );
  return result;
};

export const BookingsServices = {
  createBookingsIntoDb,
  getAllBookingsFromDb,
  getTheBookingsOfSpecificTeacherFromDb,
  getTheBookingsOfSpecificStudentFromDb,
  confirmedBookingsIntoDb,
  cancelBookingsIntoDb,
};
