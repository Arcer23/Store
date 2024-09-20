const express = require("express");
const server = express();
const database = require("./config/mongoose-connection");
const path = require("path"); // why are we using this
const cookieParser = require("cookie-parser"); // why are we using this
const ownerRouter = require("./routes/ownerRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
server.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "another",
  })
);
const flash = require("connect-flash");
const cors = require("cors");
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(flash());
server.use(express.json()); //alternative of body_parser
server.use(cookieParser()); // why are we using this
server.use(express.static(path.join(__dirname, "public"))); // why are we using this
server.set("view engine", "ejs");
require("dotenv").config();

server.use("/", indexRouter);
server.use("/owner", ownerRouter);
server.use("/users", usersRouter);
server.use("/products", productsRouter);
server.listen(3000, function () {
  console.log("server is running at port 3000");
});
