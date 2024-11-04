import axios from "axios";

const API_URL = "http://localhost:3000/lottery";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        console.log(response)
        const token = response.data.access_token;
        console.log(token);
        localStorage.setItem('authToken', token); // Almacenar el token en localStorage
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};
