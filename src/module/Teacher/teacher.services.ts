import AppError from "../../app/Error/AppError";
import { Teacher } from "./teacher.model";


//! get All Teacher

const getAllTeacherFromDb = async () => {
  const result = await Teacher.find().populate("reviews");
  return result;
};

//! update hourly rate
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

//! turn on availability status
const turnOnAvabilityStatusIntoDb = async (Id: string) => {
  // console.log("from services", userId);
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

//! turn off availability status
const turnOfAvabilityStatusIntoDb = async (Id: string) => {
  // console.log("from services", userId);
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
  turnOnAvabilityStatusIntoDb,
  turnOfAvabilityStatusIntoDb,
  updateHourlyRateIntoDb,
};
