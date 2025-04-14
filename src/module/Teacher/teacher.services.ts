import status from "http-status";
import AppError from "../../app/Error/AppError";
import { Teacher } from "./teacher.model";
import { TTeacher } from "./teacher.interface";

// get All Teacher
const getAllTeacherFromDb = async (query: Record<string, undefined>) => {
  const result = await Teacher.find().populate("reviews");

  const updatedResult = result.map((teacher) => {
    const ratings = teacher.reviews.map((r: { rating: number }) => r.rating);
    const total = ratings.reduce(
      (sum: number, rating: number) => sum + rating,
      0
    );
    const averageRating = ratings.length
      ? parseFloat((total / ratings.length).toFixed(2))
      : 0;

    return {
      ...teacher.toObject(), // Convert Mongoose Document to plain object
      averageRating,
    };
  });

  //! search method impliment here
  // console.log("baseQuery", query);
  let filteredResult = updatedResult;
  const teacherSearchableFields = ["district"];
  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query?.searchTerm;
  }

  // Filter by searchTerm (district)
  if (query.searchTerm) {
    filteredResult = filteredResult.filter((teacher) =>
      teacherSearchableFields.some((field) => {
        const value = teacher[field as keyof typeof teacher];
        return (
          typeof value === "string" && new RegExp(searchTerm, "i").test(value)
        );
      })
    );
  }

  // Filter by subject
  if (query.subject) {
    filteredResult = filteredResult.filter((teacher) => {
      const value = teacher.subjects;
      return (
        Array.isArray(value) &&
        value.some(
          (subject) =>
            query.subject && new RegExp(query.subject, "i").test(subject)
        )
      );
    });
  }

  // Filter by name
  if (query.name) {
    filteredResult = filteredResult.filter((teacher) => {
      return (
        typeof teacher.name === "string" &&
        query.name && new RegExp(query.name, "i").test(teacher.name)
      );
    });
  }

  // Filter by grade
  if (query.grade) {
    filteredResult = filteredResult.filter((teacher) => {
      const value = teacher.grade;
      return (
        Array.isArray(value) &&
        value.some(
          (grade) => query.grade && new RegExp(query.grade, "i").test(grade)
        )
      );
    });
  }

  // Filter by averageRating
  if (query.rating) {
    const ratingFilter = parseFloat(query.rating);
    filteredResult = filteredResult.filter((teacher) => {
      return (
        typeof teacher.averageRating === "number" &&
        teacher.averageRating >= ratingFilter
      );
    });
  }

  // Filter by hourlyRate
  if (query.hourlyRate) {
    const rateFilter = parseFloat(query.hourlyRate);
    filteredResult = filteredResult.filter((teacher) => {
      return (
        typeof teacher.hourlyRate === "number" &&
        teacher.hourlyRate <= rateFilter // 🔥 this line changed!
      );
    });
  }

  // Filter by availability
  if (query.availability) {
    const availabilityFilter = query.availability === "true";
    filteredResult = filteredResult.filter((teacher) => {
      return teacher.availability === availabilityFilter;
    });
  }
  // shorting functionality
  if (query.sortBy) {
    if (query.sortBy === "rating") {
      filteredResult.sort((a, b) => {
        const ratingA =
          typeof a.averageRating === "number" ? a.averageRating : 0;
        const ratingB =
          typeof b.averageRating === "number" ? b.averageRating : 0;
        return ratingB - ratingA; // High to low
      });
    } else if (query.sortBy === "lowest") {
      filteredResult.sort((a, b) => (a.hourlyRate ?? 0) - (b.hourlyRate ?? 0)); // Low to high
    } else if (query.sortBy === "highest") {
      filteredResult.sort((a, b) => (b.hourlyRate ?? 0) - (a.hourlyRate ?? 0)); // High to low
    } else if (query.sortBy === "newest") {
      filteredResult.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Newest first
      });
    }
  }

  return filteredResult;
};

// get single teacher
const getSingleTeacherFromDB = async (Id: string) => {
  const teacher = await Teacher.findById(Id).populate("reviews");
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }
  const ratings = teacher.reviews.map((r: { rating: number }) => r.rating);
  const total = ratings.reduce(
    (sum: number, rating: number) => sum + rating,
    0
  );
  const averageRating = ratings.length
    ? parseFloat((total / ratings.length).toFixed(2))
    : "No reviews";
  return {
    ...teacher.toObject(), // Convert Mongoose Document to plain object
    averageRating,
  };
};

// update teacher into db
const updateTeacherIntoDb = async (
  id: string,
  payload: Partial<TTeacher>,
  userData: any
) => {
  // console.log(id);
  // console.log(userData);
  const teacher = await Teacher.findById(id);
  console.log(teacher);
  if (!teacher) {
    throw new AppError(status.NOT_FOUND, "Teacher Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Profile , You Cant Update This"
    );
  }
  const result = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// update hourly rate
const updateHourlyRateIntoDb = async (
  Id: string,
  payload: { hourlyRate: number },
  userData: any
) => {
  // console.log(payload);
  console.log({ userData });

  const teacher = await Teacher.findById(Id);

  // console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Profile , You Cant Update This"
    );
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { hourlyRate: payload.hourlyRate },
    { new: true, runValidators: true }
  );
  return result;
};

// turn on availability status
const turnOnAvabilityStatusIntoDb = async (Id: string, userData: any) => {
  const teacher = await Teacher.findById(Id);
  console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Profile , You Cant Update This"
    );
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { availability: true },
    { new: true, runValidators: true }
  );
  return result;
};

// turn off availability status
const turnOfAvabilityStatusIntoDb = async (Id: string, userData: any) => {
  const teacher = await Teacher.findById(Id);
  console.log(teacher);
  if (!teacher) {
    throw new AppError(404, "Teacher Not Found");
  }

  const userId = teacher.user;
  if (!userId.equals(userData.userId)) {
    throw new AppError(
      status.BAD_REQUEST,
      "This is Not Your Profile , You Cant Update This"
    );
  }

  const result = await Teacher.findByIdAndUpdate(
    Id,
    { availability: false },
    { new: true, runValidators: true }
  );
  return result;
};

export const TeacherServices = {
  getAllTeacherFromDb,
  getSingleTeacherFromDB,
  turnOnAvabilityStatusIntoDb,
  turnOfAvabilityStatusIntoDb,
  updateHourlyRateIntoDb,
  updateTeacherIntoDb,
};
