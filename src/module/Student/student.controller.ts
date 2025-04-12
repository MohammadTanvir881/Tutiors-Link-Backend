import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import httpStatus, { status } from "http-status";

// get all student from db
const getAllStudentFromDB = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudent();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All student fetched successfully",
    data: result,
  });
});

// get single student from db
const getSingleStudentFromDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const student = await StudentServices.getSingleStudent(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
});

//update Student into db
const UpdateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log("update Student", req.body);

  const result = await StudentServices.updateStudentDataIntoDb(
    id,
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is Updated succesfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  UpdateStudent,
};
