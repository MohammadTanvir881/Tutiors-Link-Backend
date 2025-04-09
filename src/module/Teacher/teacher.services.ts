import AppError from "../../app/Error/AppError";
import { Teacher } from "./teacher.model";

// get All Teacher
const getAllTeacherFromDb = async () => {
  const result = await Teacher.find().populate("reviews");

  const updatedResult = result.map((teacher) => {
    const ratings = teacher.reviews.map((r: { rating: number }) => r.rating);
    const total = ratings.reduce(
      (sum: number, rating: number) => sum + rating,
      0
    );
    const averageRating = ratings.length
      ? parseFloat((total / ratings.length).toFixed(2))
      : "No reviews";

    return {
      ...teacher.toObject(), // Convert Mongoose Document to plain object
      averageRating,
    };
  });
  return updatedResult;
};

// get single teacher
const getSingleTeacherFromDB = async (Id: string) => {
  const teacher = await Teacher.findById(Id).populate("reviews");
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }
  const ratings = teacher.reviews.map((r: { rating: number }) => r.rating);
  const total = ratings.reduce(
    (sum: number, rating: number) => sum + rating,
    0
  );
  const averageRating = ratings.length
    ? parseFloat((total / ratings.length).toFixed(2))
    : "No reviews";
  return {
    ...teacher.toObject(), // Convert Mongoose Document to plain object
    averageRating,
  };
};

// update hourly rate
const updateHourlyRateIntoDb = async (
  Id: string,
  payload: { hourlyRate: number }
) => {
  console.log(payload);

  const teacher = await Teacher.findById(Id);

  console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { hourlyRate: payload.hourlyRate },
    { new: true, runValidators: true }
  );
  return result;
};

// turn on availability status
const turnOnAvabilityStatusIntoDb = async (Id: string) => {
  const teacher = await Teacher.findById(Id);
  console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { avability: true },
    { new: true, runValidators: true }
  );
  return result;
};

// turn off availability status
const turnOfAvabilityStatusIntoDb = async (Id: string) => {
  const teacher = await Teacher.findById(Id);
  console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { avability: false },
    { new: true, runValidators: true }
  );
  return result;
};

export const TeacherServices = {
  getAllTeacherFromDb,
  getSingleTeacherFromDB,
  turnOnAvabilityStatusIntoDb,
  turnOfAvabilityStatusIntoDb,
  updateHourlyRateIntoDb,
};
