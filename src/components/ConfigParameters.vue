<template>
    <div class="config-parameters">
        <h2>Configuración de Parámetros</h2>
        <form @submit.prevent="saveSettings">
            <div class="form-group">
                <label for="executionTime">Horario de Ejecución:</label>
                <input type="time" v-model="executionTime" id="executionTime" />
            </div>
            <div class="form-group">
                <label for="emails">Correos de Envío:</label>
                <input type="email" v-model="emails" id="emails" placeholder="Ingrese los correos separados por coma" />
            </div>
            <div class="form-group">
                <label for="backgroundImage">Imagen de Fondo:</label>
                <input type="file" @change="onFileChange" id="backgroundImage" />
            </div>
            <button type="submit" class="btn-save">Guardar Configuración</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            executionTime: '23:50',
            emails: '',
            backgroundImage: null,
        };
    },
    methods: {
        onFileChange(event) {
            this.backgroundImage = event.target.files[0];
        },
        saveSettings() {
            // Aquí podrías agregar el código para guardar los parámetros en el backend
            alert('Configuración guardada');
        }
    }
};
</script>

<style scoped>
.config-parameters {
    max-width: 500px;
    margin: auto;
    padding: 2em;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #2c3e50;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 1em;
}

label {
    margin-bottom: 0.5em;
    color: #333;
}

input[type="time"],
input[type="email"],
input[type="file"] {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
}

input[type="file"] {
    padding: 0.2em;
}

.btn-save {
    padding: 0.7em;
    border: none;
    border-radius: 5px;
    background-color: #42b983;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-save:hover {
    background-color: #369f6b;
}
</style>