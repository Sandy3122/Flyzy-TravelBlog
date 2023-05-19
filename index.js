var express = require("express");
var app = express();
var path = require("path");
app.path = require("path");
const bodyparser = require("body-parser");

port = 8000

// sessions
const cookieParser = require("cookie-parser");
var sessions = require("express-session");

// Paths ( This is serve our public folder as a static folder )
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "js")));

//Importing Schema's

app.use(bodyparser.json()); //this is to accept data in json format
app.use(bodyparser.urlencoded({ extended: false })); //this is basically to decode the data and it will send through html form 

// Importing Schemas
const registrationSchema = require("./models/registrationSchema");
// const reviewsData = require("./models/reviewSchema.js");
// const custLogInSchema = require('./models/logInSchema');

// Mongodb Database Connection
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Sandeep1999:Sandeep3122@sandeep.nlcna.mongodb.net/Flyzy_Travel_Blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully Connected To MongoDB Database.");
  })
  .catch((e) => {
    console.log("Not Connected To MongoDB Database.");
  });


// Sessions
app.use(cookieParser())
app.use(
  sessions({
    cookieName: "sessions",
    secret: "ramuknamhskalpeednasmarees1999",
    saveUninitialized: true,
    resave: false
  })
);

var session;

// apps
// app.get("/", function(req,res) {
//     session=req.session;
//     if(session.user){
//         res.sendFile(__dirname + "/pages/home1.html");
//     }else
//     res.sendFile(__dirname + "/pages/login.html");
// });
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/pages/home.html");
});

app.get("/home", function (req, res) {
    session=req.session;
    if(session.user){
        // console.log(session.user);
        res.sendFile(__dirname + "/pages/home1.html");
    }else
    res.sendFile(__dirname + "/pages/home.html");
});

app.get("/aboutUs", function (req, res) {
  res.sendFile(__dirname + "/pages/about.html");
});
app.get("/careers", function (req, res) {
  res.sendFile(__dirname + "/pages/careers.html");
});
app.get("/features", function (req, res) {
  res.sendFile(__dirname + "/pages/features.html");
});
app.get("/gallery", function (req, res) {
  res.sendFile(__dirname + "/pages/gallery.html");
});
app.get("/packages", function (req, res) {
  res.sendFile(__dirname + "/pages/packages.html");
});
app.get("/recommended", function (req, res) {
  res.sendFile(__dirname + "/pages/recommended.html");
});

app.get("/send", function (req, res) {
  session = req.session;
  if (session.user) {
    // console.log("working");
    console.log(session.user);
    res.sendFile(__dirname + "/pages/careers.html");
  } else {
    res.redirect("/login");
  }
});


app.get("/login", function (req, res) {
  session = req.session;
  if (session.user) {
    res.send("Welcome User <a href='/logout'>click to logout</a>");
  } else 
  {
    res.sendFile(__dirname + "/pages/login.html");
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

//sending registration data to database
app.post("/sendData", function (req, res) {
  console.log(req.body);
  var obj = new registrationSchema({
    Name: req.body.Name,
    MobileNumber: req.body.MobileNumber,
    Email: req.body.Email,
    Password: req.body.Password,
  });

  registrationSchema.findOne({Name: req.body.Name, MobileNumber: req.body.MobileNumber, Email: req.body.Email},
    function (err, docs) {
      if (err || docs == null) {
        console.log(err)
        obj.save(function (err, results) {
          if (results) {
            //    console.log("results"+ results);
            res.send(results);
          } else {
            console.log(err);
            res.send(err);
          }
        });
      } else {
        res.sendStatus(500);
      }
    }
  );
});

//Login Data
app.post("/loginData", function (req, res) {
  //res.sendFile(__dirname + '/template/signup.html');
  session=req.session;
  console.log(req.body);
  registrationSchema.findOne(
    {Email: req.body.Email, Password: req.body.Password},
    function (err, docs) {
      if (err || docs == null) {
        //console.log(err)
        res.sendStatus(500);
      } 
      else{
        session.user=docs;
        res.send(docs);
      }
    })
});

//Sending Reviews Data To MongoDB Data Base


//Schema For Customer Reviews
const custReviews = {
    Name: String,
    MobileNumber: String,
    Email: String,
    Message: String
}
const Reviews = mongoose.model("Reviews", custReviews);

app.post("/reviewsData", async(req, res)=> {
  // console.log("We are in inside post function");
  try{
    let newReviews = new Reviews({
      Name:req.body.Name,
      MobileNumber:req.body.MobileNumber,
      Email:req.body.Email,
      Message:req.body.Message
  });
  const result = await newReviews.save()
  res.send(result);
  console.log(result)
  }
  catch (error) {
    console.log(error.message);
  }
})



//listening to the server
app.listen(port, () => console.log("Successfully Server Started And Listening To Server Port :",port));
