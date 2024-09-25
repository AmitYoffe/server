import dotenv from "dotenv";
import express from "express";
import { directorsRouter, moviesRouter } from "./controllers";
import errorHandler from "./middlewares/error";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/directors", directorsRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
