<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Usuario:</label>
                <input type="text" v-model="username" id="username" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" v-model="password" id="password" required />
            </div>
            <button type="submit">Iniciar</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { login } from "@/services/authService";

export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await login(this.username, this.password);
                console.log("Login successful:", response);
                localStorage.setItem('authToken', response.access_token); // Almacenar el token en localStorage
                window.location.href = "/home"; // Redirigir a Home
            } catch (error) {
                this.errorMessage = "Login failed. Please check your credentials.";
            }
        },
    },
};
</script>

<style scoped>
.login {
    max-width: 300px;
    margin: auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.error {
    color: red;
}
</style>