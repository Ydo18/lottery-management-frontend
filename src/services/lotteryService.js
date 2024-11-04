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
        const response = await axiosInstance.get("/generate-image");
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

export const updateParameters = async (params) => {
    try {
        const response = await axiosInstance.post("/update-parameters", params);
        return response.data;
    } catch (error) {
        console.error("Error updating parameters:", error);
        throw error;
    }
};

export const uploadImage = async (formData) => {
    try {
        const response = await axiosInstance.post("/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error.response ? error.response.data : error.message);
        throw error;
    }
};