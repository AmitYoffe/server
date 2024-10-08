import dotenv from "dotenv";
import express from "express";
import { directorsRouter, moviesRouter } from "./controllers";
import errorHandler from "./middlewares/error";
import loggerHandler from "./middlewares/loggerHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", moviesRouter, errorHandler);
app.use("/directors", directorsRouter, errorHandler);
app.use(loggerHandler);

// app.get('/favicon.ico', (req, res) => {
//   res.status(404).send();
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
