const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parse");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database/mongoDb");
const passport = require("passport")
const cookieSession = require("cookie-session")
const io = require('./socket/socket')
const userRouter = require("./routes/userRoutes");
const adminRouter = require('./routes/adminRoutes')
const chatRouter = require('./routes/chatRouter')

// .env file
dotenv.config();


//  creating express
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ exteded: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize())


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

// / creating the routes
app.use('/chat',chatRouter)
app.use("/", userRouter);
app.use("/admin",adminRouter)

// listening to the port
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => console.log(`server conected to ${PORT}`));
io.attach(server)

