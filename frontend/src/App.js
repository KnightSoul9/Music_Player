import './App.css';
import{BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './routes/Login';
import Home from './routes/Home';
import SignUp from './routes/SignUp';
import MyMusic from './routes/MyMusic';
import { useCookies } from 'react-cookie';
import { Navigate } from'react-router-dom';
import LoggedInHomeComponent  from './routes/LoggedInHome';
import UploadSongComponent from './routes/UploadSong';
import songContext from './context/songContext';
import { useState } from 'react';
import SearchPage from './routes/SearchPage';
import Library from './routes/Library';
import SinglePlaylistView from './routes/SinglePlaylistView';
    function App() {
      const [soundPlayed, setSoundPlayed] = useState(null);
      const [isPaused, setIsPaused] = useState(true);
      const [currentSong, setCurrentSong] = useState(null);
      const [cookie,setCookie] = useCookies(["token"]);
      return (
          <div className='w-screen h-screen font-poppins'>
        <BrowserRouter>
          {cookie.token ? (
            <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}}>
          <Routes>
            //we are using this value so that we can take the values from the usestate variablle not from the songContext file
            //if user is already logged in then redirect him
            // to home if he tries to login or signup then also redirect him to home
            <Route path="/" element={<Home/>} />
            <Route path="/Home" element={<LoggedInHomeComponent/>} />
            <Route path="/myMusic" element={<MyMusic/>} />
            <Route path="/uploadSong" element={<UploadSongComponent/>} /> 
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/library" element={<Library/> }/> 
            <Route path="/playlist/:playlistId" element={<SinglePlaylistView/>}/>
            <Route path="*" element={<Navigate to ="/home"/>} />
          </Routes>
            </songContext.Provider>
          ) : (
          <Routes>
             <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/Home" element={<Home/>} />
            //If user is not logged in then on entering any api call redirect him to login page
            <Route path="*" element={<Navigate to ="/Home"/>} />
          </Routes>
          )}
        </BrowserRouter>
          </div>
      );
    }

export default App;
