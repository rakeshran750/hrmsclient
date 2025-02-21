import axios from "axios";
// const apiBaseUrl = import.meta.env.BASE_URL;

// const BASE_URL = "http://localhost:5000/api"
const BASE_URL = "https://hrms-server-2p7z.onrender.com/api"


// Create an Axios instance
const api = axios.create({
  baseURL:BASE_URL,
  timeout: 5000, 
});

// **Request Interceptor**
api.interceptors.request.use(
  (config) => {
    // Modify the request before sending it
    const token = localStorage.getItem("token"); // Get token from storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);



// // **Response Interceptor**
// api.interceptors.response.use(
//   (response) => {
//     // Modify the response before passing it to then/catch
//     console.log("Response Received: ", response);
//     return response;
//   },
//   (error) => {
//     // Handle error responses (e.g., token expiration)
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       // Redirect to login page or refresh token logic
//     }
//     return Promise.reject(error);
//   }
// );

// **Using the Axios instance**
export default api;


// import api from "./api"; // Import the Axios instance

// // Example API call using the instance
// async function fetchData() {
//   try {
//     const response = await api.get("/data");
//     console.log("Data:", response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchData();