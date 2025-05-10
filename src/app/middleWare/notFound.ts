/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextFunction, Request, Response } from "express";
//   import { RequestHandler } from "express";

// const notFound: RequestHandler = ( req: Request, res: Response, next: NextFunction) => {

//      res.status(404).json({
//       success: false,
//       message : "APi not found" ,
//       error: "",
//     });
//   }

//   export default notFound;

import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });

  return;
};

export default notFound;
