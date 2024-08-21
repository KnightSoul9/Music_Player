const express = require("express");
//Here we are only calling the router features that are present in the express
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helper")
// This POST route will help to register a
router.post ("/register",async  (req, res) =>{

    // This code is run when the /register api is called as a POST request
// My req.body will be of the format {email, password, firstName, lastName, username}
    const {email, password, firstName, lastName, username} = req.body;
    //•Step•2•: •Does•a user with this email already exist
    //findOne will find that email which is already in the database
    const user = await User.findOne({email: email});
    if (user) {
    // status code by default is 200
    return res
        .status(403)
        .json({error: "A user with this email already exists"});
    }
    // This is a valid request
    // Step 3: Create a new user in the DB
    // Step 3.1 : We do not store passwords in plain text.
    // xyz: we convert the plain text password to a hash.
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserData = {
        email,
        password: hashedPassword, 
        firstName, 
        lastName, 
        username};
    const newUser = await User.create(newUserData);
    // Step 4: We want to create the token to return to the user
    const token = await getToken (email, newUser);
    // Step 5: Return the result to the user
    const userToReturn = {...newUser.toJSON(), token};
    //And delete the hashed password from the token this will secure the hashing
    delete userToReturn.password;
    return res.status (200).json(userToReturn);
});
router.post("/login", async (req, res) =>{
    //Step 1: Get email and password sent by user from req.body
    const {email, password} = req.body;
    //Step 2: Check if a user with the given email exists. If not, the credentials are not valid
    const user = await User.findOne({email: email});
    if (!user) {
    return res.status(403).json({err: "Invalid credentials"});
    }
    // Step 3: If the user exists, check if the password is correct. If not, the credent
    // This is a tricky step. Why?
    //Because we have stored the original password in a hash form and we cannot convert the hash into the password back 
    // I cannot do : if(password === user.password)
    //bcrypt.compare enabled us to compare 1 password in plaintext (password from req.body) to a hashed password(the one in our db) securely.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // This will be true or false.
    if(!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }
    // Step 4: If the credentials are correct, return a token to the user.
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

module.exports = router;