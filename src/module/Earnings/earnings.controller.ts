import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TotalEarnings } from "./earnings.services";

const getTotalEarnings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TotalEarnings.CalculateTotalEarnings(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Earnings Fetched succesfully",
    data: result,
  });
});

export const EarningsController = {
  getTotalEarnings,
};
