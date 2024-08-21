import { Icon } from "@iconify/react";
import IconText from "../Components/Shared/IconText";
import TextHover from "../Components/Shared/TextHover";
import { Howl, Howler } from "howler";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import songContext from "../context/songContext";
import spotify_logo from "../assets/images/spotify_logo_white.svg"
import CreatePlaylistModal from "../modals/CreatePlaylistModals";
import AddToPlaylistModal from "../modals/AddToPlaylist";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";

// const LoggedInContainer=({children,curActiveScreen})=> {
//   const [createPlaylistModalOpen,setCreatePlaylistModalOpen] =useState(false);
//   const [addToPlaylistModalOpen,setAddToPlaylistModalOpen] =useState(false);
//   const {currentSong, setCurrentSong, soundPlayed,setSoundPlayed,isPaused,setIsPaused} = useContext(songContext);
//   const firstUpdate = useRef(true);
// //It will render the function after all the dom get render 
//   useLayoutEffect(()=>{
//     //the function will not run one first render
//     if(firstUpdate.current){
//       firstUpdate.current = false;
//       return;
//     }
//     if (!currentSong) {
//       return;
//     }
//     changeSong(currentSong.track)
//   },[currentSong && currentSong.track])
//   const addSongToPlaylist =async(playlistId)=>{
//     const songId = currentSong._id
//     const payload ={playlistId,songId}
//     const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload)
//     if(response._id){
//       setAddToPlaylistModalOpen(false)
//     }
//   }
//   const playSound = ()=>{
//     if(!soundPlayed){
//       return;
//     }
//     soundPlayed.play();
//   }

//   const changeSong = (songSrc) => {
//     if (soundPlayed) {
//       soundPlayed.stop();
//     }
//     let sound = new Howl({
//       src: [songSrc],
//       html5: true,
//     });
//     setSoundPlayed(sound);
//     sound.play();
//     setIsPaused(false); 
//   };
//   const pauseSound = () => {
//     soundPlayed.pause();
//   };
//   const togglePlayPause = () => {
//     if (isPaused) {
//       playSound();
//       setIsPaused(false);
//     } else {
//       pauseSound();
//       setIsPaused(true);
//     }
//   };
//   return (
//     <div className="h-full w-full bg-app-black">
//       {/* //In the next line we are designing the modal that will appear on the screen and when we prees outside the modal it get closes */}
//       {createPlaylistModalOpen&&(<CreatePlaylistModal closeModal={()=>(setCreatePlaylistModalOpen(false))}/>)}
//      
//       {addToPlaylistModalOpen && (<AddToPlaylistModal closeModal={()=>{setAddToPlaylistModalOpen(false)}} addSongToPlaylist={addSongToPlaylist}/>)}
//       <div className={`${currentSong ? "h-9/10" : "h-full"}w-full flex`}>
//         {/* first div will be the left panel */}
//         <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10 ">
//           {/* logo */}
//           <div>
//           <div className="logoDiv p-6">
//                             <img
//                                 src={spotify_logo}
//                                 alt="spotify logo"
//                                 width={125}
//                             />
//                         </div>
//             <div className="py-5">
//               <IconText
//                 iconName={"material-symbols:home"}
//                 displayText={"Home"}
//                 active={curActiveScreen === "home"}
//                 targetLink={"/home"}
//               />
//               <IconText
//                 iconName={"material-symbols:search-rounded"}
//                 displayText={"Search"}
//                 active={curActiveScreen === "search"}
//                 targetLink={"/search"}
//               />
//               <IconText
//                 iconName={"icomoon-free:books"}
//                 displayText={"Library"}
//                 active={curActiveScreen === "library"}
//                 targetLink={"/library"}
//               />
//               <IconText
//                 iconName={"material-symbols:library-music-sharp"}
//                 displayText={"My Music"}
//                 active={curActiveScreen === "myMusic"}
//                 targetLink={"/myMusic"}
//               />
//             </div>
//             <div className="pt-5">
//               <IconText
//                 iconName={"material-symbols:add-box"}
//                 displayText={"Create Playlist"}
//                 onClick={()=>{setCreatePlaylistModalOpen(true)}}
//               />
//               <IconText
//                 iconName={"mdi:cards-heart"}
//                 displayText={"Liked Songs "}
//               />
//             </div>
//           </div>
//           <div className="px-5 ">
//             <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center cursor-pointer justify-center hover:border-white">
//               <Icon icon="carbon:earth-europe-africa" />
//               <div className="ml-2 text-sm font-semibold">
//                 English
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* second div will be the right part */}
//         <div className="h-full w-4/5 bg-app-black overflow-auto">
//           {/* first div for the navbar  */}
//           <div className="w-full bg-black h-1/10 bg-opacity-30 flex items-center justify-end">
//             <div className="w-1/2 flex h-full ">
//               <div className="w-2/3 flex justify-around items-center">
//                 <TextHover displayText={"Premium"} />
//                 <TextHover displayText={"Support"} />
//                 <TextHover displayText={"Download"} />
//                 <div className="h-1/2 border-r border-white"></div>
//               </div>

//               <div className="w-1/3 flex justify-around h-full items-center">
//                 <TextHover displayText={"Upload Songs"} />
//                 <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
//                   SA
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* second div for displaying the songs */}
//           <div className="p-8 overflow-auto pt-0">{children}</div>
//         </div>
//       </div>
//       {currentSong && (
//         <div className="w-full h-1/10 bg-black  bg-opacity-30 text-white flex items-center px-4">
//           {/* this is current song playing  */}
//           <div className="items-center flex w-1/4">
//             <img src={currentSong.thumbnail} className="h-14 w-14 rounded"/>
//             <div className="pl-4">
//               <div className="cursor-pointer hover:underline text-sm">{currentSong.name}</div>
//               <div className="text-xs cursor-pointer hover:underline text-gray-500 ">
//                 {currentSong.artist.firstName + " " + currentSong.artist.lastName}
//               </div>
//             </div>
//           </div>
//           <div className="w-1/2 flex justify-center h-full flex-col items-center">
//             <div className="flex w-1/3 justify-between items-center">
//               {/* controls */}
//               <Icon
//                 icon="ph:shuffle-fill"
//                 fontSize={30}
//                 className="cursor-pointer text-gray-500 hover:text-white"
//               />

//               <Icon
//                 icon="mdi:skip-previous-outline"
//                 fontSize={30}
//                 className="cursor-pointer text-gray-500 hover:text-white"
//               />

//               <Icon
//                 icon={
//                   isPaused
//                     ? "ic:baseline-play-circle"
//                     : "ic:baseline-pause-circle"
//                 }
//                 fontSize={50}
//                 className="cursor-pointer text-gray-500 hover:text-white"
//                 onClick={togglePlayPause}
//               />

//               <Icon
//                 icon="mdi:skip-next-outline"
//                 fontSize={30}
//                 className="cursor-pointer text-gray-500 hover:text-white"
//               />

//               <Icon
//                 icon="ic:twotone-repeat"
//                 fontSize={30}
//                 className="cursor-pointer text-gray-500 hover:text-white"
//               />
//             </div>
//             <div>{/* progress bar */}</div>
//           </div>
//           <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
//                <Icon 
//                icon="ic:round-playlist-add" 
//                fontSize={30} 
//                className="cursor-pointer text-gray-500 hover:text-white"
//                onClick={()=>{setAddToPlaylistModalOpen(true)}}
//                />
//                <Icon 
//                icon ="ph:heart-bold"
//                fontSize={30} 
//                className="cursor-pointer text-gray-500 hover:text-white"
//                />
//             </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default LoggedInContainer;

const LoggedInContainer = ({children, curActiveScreen}) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
      useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const {
      currentSong,
      setCurrentSong,
      soundPlayed,
      setSoundPlayed,
      isPaused,
      setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);
//It will render the function after all the dom get render 
  useLayoutEffect(() => {
    //the function will not run one first render
      // the following if statement will prevent the useEffect from running on the first render.
      if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
      }

      if (!currentSong) {
          return;
      }
      changeSong(currentSong.track);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
      const songId = currentSong._id;

      const payload = {playlistId, songId};
      const response = await makeAuthenticatedPOSTRequest(
          "/playlist/add/song",
          payload
      );
      if(response._id){
          setAddToPlaylistModalOpen(false)
      }
  };

  const playSound = () => {
      if (!soundPlayed) {
          return;
      }
      soundPlayed.play();
  };

  const changeSong = (songSrc) => {
      if (soundPlayed) {
          soundPlayed.stop();
      }
      let sound = new Howl({
          src: [songSrc],
          html5: true,
      });
      setSoundPlayed(sound);
      sound.play();
      setIsPaused(false);
  };

  const pauseSound = () => {
      soundPlayed.pause();
  };

  const togglePlayPause = () => {
      if (isPaused) {
          playSound();
          setIsPaused(false);
      } else {
          pauseSound();
          setIsPaused(true);
      }
  };

  return (
      <div className="h-full w-full bg-app-black">
         {/* In the next line we are designing the modal that will appear on the screen and when we prees outside the modal it get closes */}
          {createPlaylistModalOpen && (
              <CreatePlaylistModal
                  closeModal={() => {
                      setCreatePlaylistModalOpen(false);
                  }}
              />
          )}
           {/* In the next line we are adding the song to a playlist  */}
          {addToPlaylistModalOpen && (
              <AddToPlaylistModal
                  closeModal={() => {
                      setAddToPlaylistModalOpen(false);
                  }}
                  addSongToPlaylist={addSongToPlaylist}
              />
          )}
          <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
              {/* This first div will be the left panel */}
              <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                  <div>
                      {/* This div is for logo */}
                      <div className="logoDiv p-6">
                          <img
                              src={spotify_logo}
                              alt="spotify logo"
                              width={125}
                          />
                      </div>
                      <div className="py-5">
                          <IconText
                              iconName={"material-symbols:home"}
                              displayText={"Home"}
                              targetLink={"/home"}
                              active={curActiveScreen === "home"}
                          />
                          <IconText
                              iconName={"material-symbols:search-rounded"}
                              displayText={"Search"}
                              active={curActiveScreen === "search"}
                              targetLink={"/search"}
                          />
                          <IconText
                              iconName={"icomoon-free:books"}
                              displayText={"Library"}
                              active={curActiveScreen === "library"}
                              targetLink={"/library"}
                          />
                          <IconText
                              iconName={
                                  "material-symbols:library-music-sharp"
                              }
                              displayText={"My Music"}
                              targetLink="/myMusic"
                              active={curActiveScreen === "myMusic"}
                          />
                      </div>
                      <div className="pt-5">
                          <IconText
                              iconName={"material-symbols:add-box"}
                              displayText={"Create Playlist"}
                              onClick={() => {
                                  setCreatePlaylistModalOpen(true);
                              }}
                          />
                          <IconText
                              iconName={"mdi:cards-heart"}
                              displayText={"Liked Songs"}
                          />
                      </div>
                  </div>
                  <div className="px-5">
                      <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                          <Icon icon="carbon:earth-europe-africa" />
                          <div className="ml-2 text-sm font-semibold">
                              English
                          </div>
                      </div>
                  </div>
              </div>
              {/* This second div will be the right part(main content) */}
              <div className="h-full w-4/5 bg-app-black overflow-auto">
                  <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                      <div className="w-1/2 flex h-full">
                          <div className="w-2/3 flex justify-around items-center">
                              <TextHover displayText={"Premium"} />
                              <TextHover displayText={"Support"} />
                              <TextHover displayText={"Download"} />
                              <div className="h-1/2 border-r border-white"></div>
                          </div>
                          <div className="w-1/3 flex justify-around h-full items-center">
                              <TextHover displayText={"Upload Song"} targetLink={"/uploadSong"} />
                              <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                  AC
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="content p-8 pt-0 overflow-auto">
                      {children}
                  </div>
              </div>
          </div>
          {/* This div is the current playing song */}
          {currentSong && (
              <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                  <div className="w-1/4 flex items-center">
                      <img
                          src={currentSong.thumbnail}
                          alt="currentSongThumbail"
                          className="h-14 w-14 rounded"
                      />
                      <div className="pl-4">
                          <div className="text-sm hover:underline cursor-pointer">
                              {currentSong.name}
                          </div>
                          <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                              {currentSong.artist.firstName +
                                  " " +
                                  currentSong.artist.lastName}
                          </div>
                      </div>
                  </div>
                  <div className="w-1/2 flex justify-center h-full flex-col items-center">
                      <div className="flex w-1/3 justify-between items-center">
                          {/* controls for the playing song go here */}
                          <Icon
                              icon="ph:shuffle-fill"
                              fontSize={30}
                              className="cursor-pointer text-gray-500 hover:text-white"
                          />
                          <Icon
                              icon="mdi:skip-previous-outline"
                              fontSize={30}
                              className="cursor-pointer text-gray-500 hover:text-white"
                          />
                          <Icon
                              icon={
                                  isPaused
                                      ? "ic:baseline-play-circle"
                                      : "ic:baseline-pause-circle"
                              }
                              fontSize={50}
                              className="cursor-pointer text-gray-500 hover:text-white"
                              onClick={togglePlayPause}
                          />
                          <Icon
                              icon="mdi:skip-next-outline"
                              fontSize={30}
                              className="cursor-pointer text-gray-500 hover:text-white"
                          />
                          <Icon
                              icon="ic:twotone-repeat"
                              fontSize={30}
                              className="cursor-pointer text-gray-500 hover:text-white"
                          />
                      </div>
                      {/* <div>Progress Bar Here</div> */}
                  </div>
                  <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                      <Icon
                          icon="ic:round-playlist-add"
                          fontSize={30}
                          className="cursor-pointer text-gray-500 hover:text-white"
                          onClick={() => {
                              setAddToPlaylistModalOpen(true);
                          }}
                      />
                      <Icon
                          icon="ph:heart-bold"
                          fontSize={25}
                          className="cursor-pointer text-gray-500 hover:text-white"
                      />
                  </div>
              </div>
          )}
      </div>
  );
};

export default LoggedInContainer;
