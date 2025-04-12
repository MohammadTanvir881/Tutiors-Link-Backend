import status from "http-status";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../app/Error/AppError";

// get all student data
const getAllStudent = async () => {
  const students = await Student.find().populate("user");
  return students;
};

// get single student data
const getSingleStudent = async (id: string) => {
  const student = await Student.findById(id).populate("user");
  return student;
};

// update student into db
const updateStudentDataIntoDb = async (
  id: string,
  payload: Partial<TStudent>,
  userData: any
) => {
  const student = await Student.findById(id);
  console.log(student);
  if (!student) {
    throw new AppError(status.NOT_FOUND, "Student Not Found");
  }

  const userId = student.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Profile , You Cant Update This"
    );
  }
  const result = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudent,
  getSingleStudent,
  updateStudentDataIntoDb,
};
