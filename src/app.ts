import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middleWare/globalErrorHandler";
import notFound from "./app/middleWare/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});
// const test = async (req: Request, res: Response) => {
//   Promise.reject()
// };

// app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
