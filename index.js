const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const authRoute = require("./routes/authRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
const app = express();

app.use(cors());
app.use(express.static("public"));
//connect to db
connectDB();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/userFeedback", feedbackRoute);


const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log("server started");
});
