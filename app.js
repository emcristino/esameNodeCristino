var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser') //modulo esterno
const fs = require("fs") //modulo interno 

var indexRouter = require("./routes/index"); // moduli prof importati 
var usersRouter = require("./routes/users");
var usersRouter = require("./routes/localusers");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//body parser per il form W
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


// Registriamo la cartella partials
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));




app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/localusers", usersRouter);



// routing della nuova pagina W
app.get("/registration",(req,res)=>{
  res.render("registration")
})

//submit hadler creato da Manu W

app.post('/registration',(req, res)=>{
  console.log(req.body)
  const obj = JSON.stringify(req.body)
  console.log(obj)
  fs.writeFileSync('./routes/user.json', '['+obj+']');
  console.log("writing complete!")

  /**
   * utilizzerei fs.appendFile per aggangiare ogni nuovo oggetto al file,
   * ma dovendo sempre esserci la parentesi quadra che chiude il json, risulterebbe 
   * fifficile da inserire. 
   */

})




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
