var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser') //importo il modulo esterno body Parser
// questo modulo semplifica l'invio e la ricezione di dati all'interno del form

const fs = require("fs") // importo il modulo interno di node FS

var indexRouter = require("./routes/index"); // moduli prof importati 
var usersRouter = require("./routes/users");
var usersRouter = require("./routes/localusers");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//bodyParser -> codifica dei dati !importante
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



//utilizzo del routing per le pagine del professore
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/localusers", usersRouter);


// routing della mia pagina
app.get("/registration",(req,res)=>{
  res.render("registration")
})

//submit handler -> chiamiamo la funzione post (avendo noi utilizzato il method post nel form)

app.post('/registration',(req, res)=>{// gli diamo l'endpoint uguale all'action del form
  console.log(req.body)// console.log del contenuto dell'oggetto request.body
  const obj = JSON.stringify(req.body) //trasformo l'oggetto in stringa
  console.log(obj)
  fs.writeFileSync('./routes/user.json', '['+obj+']'); //scrivo la stringa nel file indicato.
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
