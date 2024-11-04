import axios from "axios";

const API_URL = "http://localhost:3000/lottery";

// Configurar Axios para agregar el token de autenticación a las solicitudes
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el token dinámico
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añadir el token a las cabeceras
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Funciones para consumir los endpoints
export const getLotteryResults = async () => {
    try {
        const response = await axiosInstance.get("/results");
        return response.data;
    } catch (error) {
        console.error("Error fetching lottery results:", error);
        throw error;
    }
};

export const getParameters = async () => {
    try {
        const response = await axiosInstance.get("/parameters");
        return response.data;
    } catch (error) {
        console.error("Error fetching parameters:", error);
        throw error;
    }
};

export const getActiveImages = async () => {
    try {
        const response = await axiosInstance.get("/images");
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const response = await axiosInstance.get(`/user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};