const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const authRoute = require("./routes/authRoutes");
const app = express();
var multer = require("multer");
var upload = multer();

app.use(cors());
app.use(upload.array());
app.use(express.static("public"));

//connect to db
connectDB();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log("server started");
});
