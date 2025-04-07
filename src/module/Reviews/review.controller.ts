//! Creating Review

import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.services";

const createReview = catchAsync(async (req, res) => {
  // const { teacher, student, comment, rating } = req.body;
  const result = await reviewServices.createReviewIntoDb(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review is created succesfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
