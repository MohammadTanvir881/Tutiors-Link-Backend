import { Review } from "./reviews.model";

interface ReviewPayload {
  teacher: string;
  student: string;
  comment: string;
  rating: number;
}

const createReviewIntoDb = async (payload: ReviewPayload) => {
  const result = await Review.create(payload);
  return result;
};

export const reviewServices = {
  createReviewIntoDb,
};
