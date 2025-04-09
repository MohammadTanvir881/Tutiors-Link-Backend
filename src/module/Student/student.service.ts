import { Student } from "./student.model";

const getAllStudent = async () => {
    const students = await Student.find().populate('user');
    return students;
  };

const getSingleStudent = async(id:string)=>{
    const student = await Student.findById(id).populate('user');
    return student;
}
  
export const StudentServices ={
    getAllStudent,
    getSingleStudent,
}