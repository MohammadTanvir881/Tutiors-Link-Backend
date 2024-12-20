import express, { Application } from "express";
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

app.use(globalErrorHandler);
app.use(notFound);

export default app;
