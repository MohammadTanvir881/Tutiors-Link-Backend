import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { UserServices } from "./user.services";


//! Creating Student

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

 //! Creating Teacher
 
const createTeacher = catchAsync(async (req, res) => {
  const { password, teacher: teacherData } = req.body;


  const result = await UserServices.createTeacherIntoDB(
    password,
    teacherData
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Teacher is created successfully",
    data: result,
  });
});

// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body;

//   const result = await UserServices.createAdminIntoDB(password, adminData);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: "Admin is created succesfully",
//     data: result,
//   });
// });

// const changeStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await UserServices.changeStatus(id, req.body);

//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: "Status is updated succesfully",
//     data: result,
//   });
// });
export const UserControllers = {
  createStudent,
  createTeacher,
//   createAdmin,
//   changeStatus,
};
