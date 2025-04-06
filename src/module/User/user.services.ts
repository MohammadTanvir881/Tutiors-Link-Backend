/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import status from "http-status";
import AppError from "../../app/Error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";
import { Student } from "../Student/student.model";
import { TStudent } from "../Student/student.interface";
import { TTeacher } from "../Teacher/teacher.interface";
import { Teacher } from "../Teacher/teacher.model";

//! Creating Student

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password;

  //set student role
  userData.role = "student";
  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }
    payload.user = newUser[0]._id; //reference _id
    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// ! Creating Teacher
const createTeacherIntoDB = async (password: string, payload: TTeacher) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password;

  //set student role
  userData.role = "teacher";
  // set student email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }
    payload.user = newUser[0]._id; //reference _id
    // create a student (transaction-2)
    const newTeacher = await Teacher.create([payload], { session });

    if (!newTeacher.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create Teacher");
    }

    await session.commitTransaction();
    await session.endSession();

    return newTeacher;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createTeacherIntoDB,
};
