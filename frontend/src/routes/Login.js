import React, { useState } from 'react'
import {Icon} from "@iconify/react"
import TextInput from '../Components/Shared/TextInput'
import PasswordInput from '../Components/Shared/PasswordInput'
import { Link } from 'react-router-dom'
import {useNavigate } from'react-router-dom'
import { makeUnauthenticatedPOSTRequest } from '../utils/ServerHelpers'
import { Cookies, useCookies } from 'react-cookie'
function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => { 
    const data = { email, password};
        const response = await makeUnauthenticatedPOSTRequest('/auth/login',data);
        if (response && response.token) {
            const token = response.token; 
            const date = new Date();
            //storing the authentication of the user into cookie for 30 days will be use to verify the user
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path: "/",expires: date})
            navigate('/home');
        } else {
            alert("Invalid Credentials");
        }
};

  return <div className='w-full h-full flex flex-col items-center'>
    <div className='logo p-2 border-b border-solid border-gray-950 w-full flex justify-center'>
    <Icon icon="arcticons:amazon-music" width ="145"/> 
    </div>
    <div className='inputRegion w-1/3 py-10 flex items-center justify-center flex-col'>
      <div className='font-bold mb-9'>
        To Continue, Login into the Music Player
      </div>
        <TextInput label="Email ID or Username"
          placeholder="Email ID or Username"
          value={email}
          setValue={setEmail}/>
        <PasswordInput label="Password"
          placeholder="Enter the Password"
          className="my-6"
          value={password}
          setValue={setPassword}/>
          <div className='w-full flex items-center justify-end my-8'>
          <button className='bg-green-400 text-lg font-semibold p-3 px-10 rounded-full'
          onClick={(e)=>{
            e.preventDefault();
            login();
          }}>
            LOG IN
            </button>
          </div>
          <div className='w-full border border-solid border-gray-300'></div>
          <div className='my-6 font-bold text-lg'> Don't Have an Account?</div>
          <button className='border border-gray-400 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold'>
            <Link to ='/signup'>
              SIGN UP FOR MUSIC PLAYER!
            </Link>
          </button>
      </div>

    
  </div> 
}

export default Login 
