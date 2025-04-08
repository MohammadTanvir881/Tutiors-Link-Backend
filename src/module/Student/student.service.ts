import { Student } from "./student.model";

const getAllStudent = async () => {
    
    const res = await Student.findOne();
    
    return res;
  };

  
  export const StudentServices ={
    getAllStudent
  }