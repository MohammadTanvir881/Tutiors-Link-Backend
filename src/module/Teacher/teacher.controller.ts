import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TeacherServices } from "./teacher.services";

// const getSingleTeacher = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await StudentServices.getSingleStudentFromDB(id);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: "Student is retrieved succesfully",
//     data: result,
//   });
// });

const getAllTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getAllTeacherFromDb();

  //   sendResponse(res, {
  //     statusCode: status.OK,
  //     success: true,
  //     message: "Student are retrieved succesfully",
  //     meta: result.meta,
  //     data: result.result,
  //   });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is retrieved succesfully",
    data: result,
  });
});

export const TeacherControllers = {
  //   getSingleTeacher,
  getAllTeacher,
};
