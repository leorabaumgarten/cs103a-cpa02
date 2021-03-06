/*
  app.js -- This creates an Express webserver with login/register/logout authentication
*/

// *********************************************************** //
//  Loading packages to support the server
// *********************************************************** //
// First we load in all of the packages we need for the server...
const createError = require("http-errors"); // to handle the server errors
const express = require("express");
const path = require("path");  // to refer to local paths
const cookieParser = require("cookie-parser"); // to handle cookies
const session = require("express-session"); // to handle sessions using cookies
const bodyParser = require("body-parser"); // to handle HTML form input
const debug = require("debug")("personalapp:server"); 
const layouts = require("express-ejs-layouts");


const BookReview = require("./models/BookReview")
// *********************************************************** //
//  Connecting to the database
// *********************************************************** //

const mongoose = require( 'mongoose' );
const mongodb_URI = process.env.mongodb_URI
mongoose.connect( mongodb_URI,
  { useNewUrlParser: true, useUnifiedTopology: true } );
// fix deprecation warnings....
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});





// *********************************************************** //
// Initializing the Express server 
// This code is run once when the app is started and it creates
// a server that respond to requests by sending responses
// *********************************************************** //
const app = express();

// Here we specify that we will be using EJS as our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



// this allows us to use page layout for the views 
// so we don't have to repeat the headers and footers on every page ...
// the layout is in views/layout.ejs
app.use(layouts);

// Here we process the requests so they are easy to handle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Here we specify that static files will be in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Here we enable session handling using cookies
app.use(
  session({
    secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
    resave: false,
    saveUninitialized: false
  })
);

// *********************************************************** //
//  Defining the routes the Express server will respond to
// *********************************************************** //


// here is the code which handles all /login /signin /logout routes
const auth = require('./routes/auth')
app.use(auth)

// middleware to test is the user is logged in, and if not, send them to the login page
const isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  }
  else res.redirect('/login')
}

// specify that the server should render the views/index.ejs page for the root path
// and the index.ejs code will be wrapped in the views/layouts.ejs code which provides
// the headers and footers for all webpages generated by this app
app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/mybooks",
  isLoggedIn,
  async (req, res, next) => {
    try{
      let userId = res.locals.user._id;  
      let books = await BookReview.find({userId:userId}).sort({title:1,author:1}); 
      res.locals.books = books;  
      res.render("book");  
    } catch (e){
      next(e);
    }
  }
)

app.post("/book/viewbytitle",
  async (req,res,next) => {
    const {title} = req.body;
    let books = await BookReview.find({title:title});
    res.locals.allbooks = books
    res.render('viewbooks')
  }
)

app.post("/book/viewbyauthor",
  async (req,res,next) => {
    const {author} = req.body;
    let books = await BookReview.find({author:author});
    res.locals.allbooks = books
    res.render('viewbooks')
  }
)

app.post("/book/viewbygenre",
  async (req,res,next) => {
    const {genre} = req.body;
    let books = await BookReview.find({genre:genre});
    res.locals.allbooks = books
    res.render('viewbooks')
  }
)

app.post("/book/viewbyrating",
  async (req,res,next) => {
    const {rating} = req.body;
    let books = await BookReview.find({rating:rating});
    res.locals.allbooks = books
    res.render('viewbooks')
  }
)

app.post("/book/add",
  isLoggedIn,
  async (req,res,next) => {
    try{
      const {title,author,description,genre,rating} = req.body;
      const userId = res.locals.user._id;
      const username = res.locals.user.username;
      let data = {userId, username, title, author, description, genre, rating,} 
      let book = new BookReview(data) 
      await book.save()
      res.redirect("/mybooks") 
    } catch (e){
      next(e);
    }
  }
)

// here we catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// this processes any errors generated by the previous routes
// notice that the function has four parameters which is how Express indicates it is an error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// *********************************************************** //
//  Starting up the server!
// *********************************************************** //
//Here we set the port to use between 1024 and 65535  (2^16-1)
const port = process.env.PORT || "5000";
console.log('connecting on port '+port)
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const User = require("./models/User");
const server = http.createServer(app);

server.listen(port);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);

server.on("listening", onListening);

module.exports = app;
