const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");
const userRouter = require("./routes/userRoutes");
const { StatusCodes } = require("http-status-codes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Spotify Clone API is running");
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/users", userRouter);

// 404 Handler
app.use((req, res, next) => {
  const error = new Error("Not found");

  error.status = StatusCodes.NOT_FOUND;
  next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || "Internal Server Error",
    status: "error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
  console.log("Press CTRL+C to stop the server");
});
