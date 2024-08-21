import {backendUrl} from "./config"
export const makeUnauthenticatedPOSTRequest = async (route, body) =>{
    const response = await fetch(backendUrl + route, {
    method: "POST",
    headers:{
    "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
});
    const formattedResponse = await response.json();
    return formattedResponse;
};
// export const makeAuthenticatedPOSTRequest = async (route, body) =>{
//     const token = getToken();
//     const response = await fetch(backendUrl + route, {
//     method: "POST",
//     headers:{
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(body),
// });
//     const formattedResponse = await response.json();
//     return formattedResponse;
// };
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    try {
      const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch error: ", errorText);
        throw new Error("Network response was not ok");
      }
  
      const formattedResponse = await response.json();
      return formattedResponse;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  };
export const makeAuthenticatedGETRequest = async (route) =>{
    const token = getToken();
    const response = await fetch(backendUrl + route, {
    method: "GET",
    headers:{
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
});
    const formattedResponse = await response.json();
    return formattedResponse;
}; 