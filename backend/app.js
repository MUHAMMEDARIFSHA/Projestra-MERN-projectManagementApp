const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parse");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database/mongoDb");

// .env file
dotenv.config();
//  creating express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ exteded: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// code for giving access to headers through axios
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "x-access-token, x-custom-header",
  ], //allowed headers
};
// cors connecting
app.use(cors(corsOptions));

// creating the routes
const userRouter = require("./routes/userRoutes");
app.use("/", userRouter);

// listening to the port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server conected to ${PORT}`));
