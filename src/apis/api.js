import axios from "axios";
import app from "../configs/app";

const axiosClient = axios.create({
    baseURL: `${app.API_URL}/api`,
    responseType: "json",
    timeout: 15 * 1000,
    headers: {
        Authorization: app.API_TOKEN,
    },
});

axiosClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;
