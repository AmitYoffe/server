import dotenv from "dotenv";
import express from "express";
import { moviesRouter } from "./controllers/movieController";
import { directorsRouter } from "./controllers/directorController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/directors", directorsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
