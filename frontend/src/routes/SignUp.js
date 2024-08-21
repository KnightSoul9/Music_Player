import React, { useState } from "react";
import{useCookies} from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../Components/Shared/TextInput";
import PasswordInput from "../Components/Shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelpers";

function SignUp() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie,setCookie] = useCookies(["token"]);
  const navigate =useNavigate();
  const signUp = async () => {
    if (email !== confirmEmail) {
        alert("Email and Confirm Email do not match");
        return;
    }

    const data = { email, password, username, firstName, lastName };
    try {
        const response = await makeUnauthenticatedPOSTRequest('/auth/register', data);
        if (response && response.token) {
            // Handle successful registration
            alert("Registration successful!");
            const token = response.token;
            const date = new Date();
            //storing the authentication of the user into cookie for 30 days will be use to verify the user
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path: "/",expires: date})
            console.log('Registration Response:', response);
            navigate('/home');
        } else {
            // Handle server-side validation errors
            alert("Registration failed: " + response.error);
        }
    } catch (error) {
        console.error('Sign up error:', error);
        alert("An error occurred. Please try again.");
    }
};


  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-2 border-b border-solid border-gray-950 w-full flex justify-center">
        <Icon icon="arcticons:amazon-music" width="145" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-9 text-2xl">
          Sign up for free to start listening
        </div>
        <TextInput
          label="Email ID"
          placeholder="Enter Your Email"
          className="my-6"
          value={email}
          setValue={setEmail}
        />

        <TextInput
          label="Confirm Email"
          placeholder="Enter Your Email Again"
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter Your Username"
          className="mb-6"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a Strong Password"
          className="my-6"
          value={password}
          setValue={setPassword}
        />
        <div className="flex w-full justify-between items-center space-x-8">
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            className="my-6"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            className="my-6"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <button
            className="bg-green-400 text-lg font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            SIGN UP
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-bold text-lg">Already Have an Account?</div>
        <button className="border border-gray-400 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
          <Link to="/login">LOG IN INSTEAD</Link>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
