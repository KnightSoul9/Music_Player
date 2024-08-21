import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import SingleSongCard from "../Components/Shared/SingleSongCard";
const SearchPage = ()=>{
    const[isInputFocused,setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);

    const searchSong = async () => {
        // This function will call the search api
        const response = await makeAuthenticatedGETRequest(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
    };

    return( 
        <LoggedInContainer curActiveScreen="search">
            <div className="w-full py-6">
                <div className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex space-x-3 text-white items-center
                 ${isInputFocused?"border border-white":""}`}>
                    <div>
                        <Icon icon="ic:outline-search" className="text-lg"/>
                    </div>

                <input 
                    type="text" 
                    placeholder="What do you want to listen to?" 
                    className="w-full bg-gray-800 focus:outline-none"
                    onFocus={()=>{setIsInputFocused(true)}}
                    onBlur={()=>{setIsInputFocused(false)}}
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    //this functionality gives us feature to search the word only when enter is pressed
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchSong();
                        }
                    }}

                    />
                </div>
                {songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Nothing to show here.
                    </div>
                )}
            </div>
        </LoggedInContainer>
    )
    
}

export default SearchPage; 