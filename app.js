const express = require("express"); // npm install express ejs method-override body-parser connect-flash mongoose passport passport-local async nodemailer passport-local-mongoose --save
const methodOverride = require("method-override");
const app = express();
const bodyParser = require("body-parser");
// nodemailer = require("nodemailer"),
const flash = require("connect-flash");
const axios = require("axios");
const mongoose = require("mongoose");
const passport = require("passport"); //v6
const LocalStrategy = require("passport-local"); //v6
const moment = require("moment");
const m = moment();
const Colleague = require("./models/colleague");
const User = require("./models/user"); //v6
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const session = require("express-session");

if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const administrator = process.env.ADMINISTRATOR;
const adminUser = process.env.ADMINUSER;

const colleaguecommentsRoutes = require("./routes/colleaguecomments");
const colleaguesRoutes = require("./routes/colleagues");
const indexRoutes = require("./routes/index");
const shiftRoutes = require("./routes/shift");
const allocatorsRoutes = require("./routes/allocators");
const seedDB = require("./seeds");
// const options = {
//   useMongoClient: true,
// };

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useMongoClient: true
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful");
  });
// mongoose.Promise = global.Promise;
mongoose.Schema.Types.Boolean.convertToTrue.add("on");
mongoose.Schema.Types.Boolean.convertToFalse.add("off");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

//PASSPORT CONFIGURATION
app.use(
  session({
    //v6
    secret: process.env.SECRETPASS,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize()); //v6
app.use(passport.session()); //v6
passport.use(new LocalStrategy(User.authenticate())); //v6
passport.serializeUser(User.serializeUser()); //v6
passport.deserializeUser(User.deserializeUser()); //v6
app.use((req, res, next) => {
  res.locals.currentUser = req.user; //adding currentUser to every single page (header!!!)
  res.locals.administrator = adminUser;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.req = req;
  res.locals.res = res;
  next();
});
app.use("/colleagues/:id/comments", colleaguecommentsRoutes);
app.use(indexRoutes);
app.use("/colleagues", colleaguesRoutes);
app.use("/shift", shiftRoutes);
app.use("/allocator", allocatorsRoutes);

// app.post('/themes/orange', (req, res, next)=> {
//   Themes.findByIdAndUpdate()
// });

if (process.env.NODE_ENV !== "production") {
  app.listen(3002, "localhost", function () {
    console.log("Server started");
    console.log(m.format("ddd DD MMM YYYY"));
  });
} else {
  app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server started");
  });
}
