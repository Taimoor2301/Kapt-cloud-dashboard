import axios from 'axios';
import { baseURL } from 'src/Constants/Constants';

// Create a new Axios instance
const api = axios.create({
  baseURL:baseURL,
  headers:{
    'Content-Type': 'application/json',
     accept: 'application/json',
     tenant: 'root'
  }
});

// Add a request interceptor to add the access token to headers
api.interceptors.request.use(
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



// ! response interceptor

api.interceptors.response.use(
  response => {
    // Do something with successful responses
    return response;
  },
  async error => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Unauthorized access
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken || !refreshToken) {
          // Redirect to login URL if tokens are not available
          localStorage.clear();
          window.location.href = '/login';

          return Promise.reject(error);
        }

        try {
          // Attempt to refresh tokens
          const response = await axios.post(`${baseURL + '/tokens/token.getrefreshtokenasync'}`, {
            refreshToken: refreshToken, token: accessToken
          } , {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                tenant: 'root'
              }
          });
          const newAccessToken = response.data.data.token;
          const newRefreshToken = response.data.data.refreshToken;

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry original request with new access token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return api.request(error.config);
        } catch (refreshError) {
          // Clear tokens and redirect to login URL if refresh token fails
          localStorage.clear()
          window.location.href = '/login';

          return Promise.reject(refreshError);
        }
      } else {
        // Let other errors be handled by the page
        return Promise.reject(error);
      }
    } else {
      // Let other errors be handled by the page
      return Promise.reject(error);
    }
  }
);

export default api;
