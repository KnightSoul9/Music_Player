// npm init: package. json - This is a node project.
// npm i express : expressJs package install hogya.
// We finally use express project came to know that we are using express 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express ();
const port = process.env.PORT||8080;
const passport = require("passport");
const JwtStrategy = require( "passport-jwt").Strategy,
ExtractJwt = require( "passport-jwt").ExtractJwt; 
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");

app.use(cors());
app.use(express.json()); //this line will make sure that the daata coming from the req.body
//is coming in the json format

//connect mongodb to our node app
/// mongoose.connect() takes 2 arguments : 1. Which db to connect to (db url), 2. Connection options

mongoose.connect(`mongodb+srv://satysatyam14:Satyam1111@cluster0.iwxs7nr.mongodb.net`,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then((x)=>console.log("Database Connection established"))
    .catch((err)=>console.log("Error connecting to database",err));

//passport setup 
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';//It is used as key to encrypt the password 
    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            try {
                const user = await User.findOne({ _id: jwt_payload.identifier });
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
    


//API : GET type return text "Hello world"
app.get("/", (req,res)=> {
    // req contains all data for the request
    //res contains all data for the response
    res.send ("Hello World")
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);
// Now we want to tell express that our server will run on localhost:8000
app.listen(port,()=> {console. log("App is running on port " + port);})