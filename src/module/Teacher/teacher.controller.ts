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

//! get All Teacher
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

//! update hourly rate
const updateHourlyRate = catchAsync(async (req, res) => {
  const { id } = req.params;
 
  const result = await TeacherServices.updateHourlyRateIntoDb(id , req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Hourly Rate Updated succesfully",
    data: result,
  });
});

//! turn on availability status
const turnOnAvabilityStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const result = await TeacherServices.turnOnAvabilityStatusIntoDb(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Avability Status Turn On succesfully",
    data: result,
  });
});

//! turn off availability status
const turnOfAvabilityStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const result = await TeacherServices.turnOfAvabilityStatusIntoDb(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Avability Status Turn Off succesfully",
    data: result,
  });
});

export const TeacherControllers = {
  //   getSingleTeacher,
  getAllTeacher,
  turnOnAvabilityStatus,
  turnOfAvabilityStatus,
  updateHourlyRate,
};
