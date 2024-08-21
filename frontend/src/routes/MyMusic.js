import SingleSongCard from "../Components/Shared/SingleSongCard";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
// const MyMusic = () => {
//   const [songData, setSongData] = useState([]);
//   useEffect(() => {
//     //we cannot directly pass the async function to the useEffect hook
//     const getData = async () => {
//       try {
//         const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//         if (response.data && response.data.data) {
//           setSongData(response.data);
//         } else {
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching songs:", error);
//       }
//     };
//     getData();
//   }, []);
//   return(
//   <LoggedInContainer curActiveScreen="myMusic">
//     <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">MySongs</div>
//     <div className="space-y-3 overflow-auto ">
//       {songData.map((item) => {
//         return <SingleSongCard info={item} playSound={()=>{}} />;
//       })}
//     </div>
//   </LoggedInContainer>
//   );
// };
const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
      const getData = async () => {
          const response = await makeAuthenticatedGETRequest(
              "/song/get/mysongs"
          );
          setSongData(response.data);
      };
      getData();
  }, []);

  return (
      <LoggedInContainer curActiveScreen="myMusic">
          <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
              My Songs
          </div>
          <div className="space-y-3 overflow-auto">
              {songData.map((item) => {
                  return <SingleSongCard info={item} playSound={() => {}} />;
              })}
          </div>
      </LoggedInContainer>
  );
};
export default MyMusic;
