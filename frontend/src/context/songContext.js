//We are using the Context API for the global variable so that we can render the variable 
// We are using this so that we can play the music in all of the Routes once the music is palyed 
// import {creaeteContext, createContext} from "react";

import { createContext } from "react";

const songContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    soundPlayed : null,
    setSoundPlayed: ()=>{},
    isPaused:null,
    setIsPaused: ()=>{},
});
export default songContext;

