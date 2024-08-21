import { Icon } from "@iconify/react";
import IconText from "../Components/Shared/IconText";
import TextHover from "../Components/Shared/TextHover";
import TextInput from "../Components/Shared/TextInput";
import CloudinaryUpload from "../Components/Shared/CloudinaryUpload";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";
import {useNavigate} from "react-router-dom"
function UploadSong() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [UploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();
  
  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl};
    console.log("Submitting song data:", data);
  
    try {
      const response = await makeAuthenticatedPOSTRequest("/song/create", data);
      console.log("Response from server:", response);
      if (response.err) {
        alert("Failed to upload song. Please try again.");
      } else {
        alert("Song uploaded successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error submitting song:", error);
      alert("Failed to upload song. Please try again.");
    }
  };
  return (
    <div className="h-full w-full flex ">
      {/* first div will be the left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        {/* logo */}
        <div>
          <div className="p-6">
            <Icon icon="icomoon-free:spotify" width="130" />
          </div>
          <div className="py-5">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              active
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
            <IconText
              iconName={"material-symbols:library-music-sharp"}
              displayText={"My Music"}
            />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"mdi:cards-heart"}
              displayText={"Liked Songs "}
            />
          </div>
        </div>
        <div className="px-5 ">
          <div className="border border-gray-100 text-white w-2/5 flex space-x-3 px-1 py-1 rounded-full items-center cursor-pointer">
            <Icon icon="carbon:earth-europe-africa" />
            <div className="ml-1 text-sm font-semibold hover:text-white">
              English
            </div>
          </div>
        </div>
      </div>

      {/* second div will be the right part */}

      <div className="h-full w-4/5 bg-app-black overflow-auto">
        {/* first div for the navbar  */}
        <div className="w-full bg-black h-1/10 bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full ">
            <div className="w-2/3 flex justify-around items-center">
              <TextHover displayText={"Premium"} />
              <TextHover displayText={"Support"} />
              <TextHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>

            <div className="w-1/3 flex justify-around h-full items-center">
              <TextHover displayText={"Upload Songs"} />
              <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
                SA
              </div>
            </div>
          </div>
        </div>

        {/* second div for displaying the songs */}

        <div className="p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Name"
                labelClassName={"text-black"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-black"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
              </div>
            <div className="py-5 w-1/3">
              {UploadedSongFileName ? (
                <div className="bg-white rounded-full p-3 w-1/3">{UploadedSongFileName.substring(0,35)}...</div>
              ) : (
                <CloudinaryUpload
                  setUrl={setPlaylistUrl}
                  setName={setUploadedSongFileName}
                />
              )}
            </div>
            <div className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold "onClick={submitSong}>
              Submit Song
            </div>
        </div>
      </div>
    </div>
  );
}
export default UploadSong;
