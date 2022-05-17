const mongose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    //end the process with faliure
    process.end(1);
  }
};

module.exports = connectDB;
