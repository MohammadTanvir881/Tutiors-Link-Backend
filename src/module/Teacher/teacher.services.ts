import { Teacher } from "./teacher.model";

const getAllTeacherFromDb = async () => {
  const result = await Teacher.find().populate("reviews");
  return result;
};

export const TeacherServices = {
  getAllTeacherFromDb,
};
