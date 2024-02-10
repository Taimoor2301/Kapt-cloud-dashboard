import axios from 'axios';
import { baseURL } from 'src/Constants/Constants';

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL:baseURL
});

// Add a request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refreshing
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (refreshToken) {
//         try {
//           const response = await axios.post('/api/refresh-token', {
//             refreshToken: refreshToken
//           });
//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem('accessToken', newAccessToken);

//           // Retry the original request with the new access token
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           return axiosInstance(originalRequest);

//         } catch (refreshError) {
//           // Refresh token expired or invalid
//           console.error('Error refreshing token:', refreshError);

//           // Redirect user to login page
//           // Replace the following line with your own code to redirect
//           window.location.href = '/login';

//           return Promise.reject(refreshError);
//         }
//       } else {
//         // Refresh token not found, redirect user to login page
//         // Replace the following line with your own code to redirect

//         window.location.href = '/login';

//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
