import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import httpStatus from 'http-status';

const getAllStudentFromDB = catchAsync( async (req, res)=>{
    const result = await StudentServices.getAllStudent();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message:"All student fetched successfully",
        data: result,
    })
})

const getSingleStudentFromDB = catchAsync( async (req, res) =>{
    const id = req.params.id;
    const student = await StudentServices.getSingleStudent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message:'Student fetched successfully',
        data:student
    })
})

export const StudentController ={
    getAllStudentFromDB,
    getSingleStudentFromDB
}