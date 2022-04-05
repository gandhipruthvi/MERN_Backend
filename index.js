
//------------------Import------------------

const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const chat = require("./controller/chat");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const authRoute = require("./routes/authRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");
<<<<<<< HEAD
const faqRoute = require("./routes/faqRoutes");
const { Server } = require("socket.io");
=======
const faqRoute = require('./routes/faqRoutes');
const eventRoute = require('./routes/eventRoutes');
const { Server } = require('socket.io');
>>>>>>> ae28f3681f5cde73b4e7149f7efd4783cef2697d
const app = express();
const http = require("http").createServer(app);

app.use(cors());
app.use(express.static("public"));
//connect to db
connectDB();

app.use(express.json());




//--------------Connect TO Database-----------------
connectDB();

//---------------parse the response--------------
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//-------------Forward to different Routes-------------

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/userFeedback", feedbackRoute);
<<<<<<< HEAD
app.use("/api/faqs", faqRoute);
=======
app.use('/api/faqs', faqRoute);
app.use('/api/Events', eventRoute);
>>>>>>> ae28f3681f5cde73b4e7149f7efd4783cef2697d

//------------Listen server on port from environmental variable-----------------
const PORT = process.env.PORT | 5000;
http.listen(PORT, () => {
  console.log("Server Started");
});

chat(http);
