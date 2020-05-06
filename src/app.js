require("dotenv").config();
require("./utils/db");

const express = require("express");
const app = express();
app.use(express.json()); // required if you use req.body

const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));

const cors = require("cors");
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({
    "0": "GET /",
    "1": "GET /events",
    "2": "GET /events:id",
    "3": "POST /events",
    "4": "PUT /events/:id",
    "5": "DELETE /events/:id",
    "6": "POST /users/login",
    "7": "POST /users/logout",
  });
});

const eventRouter = require("./routes/event.route");
app.use("/events", eventRouter);
const userRouter = require("./routes/user.route");
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({ message: err.message });
});

module.exports = app;
