const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;

const app = express();

// Note: the order of the code is crucial
// Middleware to parse data coming from front end
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

// Middleware to overide the original express error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Hello ${port}`));
