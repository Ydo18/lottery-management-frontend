<template>
  <div class="config-parameters">
    <h2>Configuración</h2>
    <div class="sidebar">
      <ul>
        <li :class="{ active: selectedSection === 'executionTime' }" @click="selectedSection = 'executionTime'">
          Horario de Ejecución
        </li>
        <li :class="{ active: selectedSection === 'emails' }" @click="selectedSection = 'emails'">
          Correos de Envío
        </li>
        <li :class="{ active: selectedSection === 'backgroundImage' }" @click="selectedSection = 'backgroundImage'">
          Imagen de Fondo
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="selectedSection === 'executionTime'" class="form-group">
        <label for="cronMinute">Minuto:</label>
        <input type="text" v-model="cronMinute" id="cronMinute" placeholder="0-59, *" />
        <label for="cronHour">Hora:</label>
        <input type="text" v-model="cronHour" id="cronHour" placeholder="0-23, *" />
        <label for="cronDayOfMonth">Día del Mes:</label>
        <input type="text" v-model="cronDayOfMonth" id="cronDayOfMonth" placeholder="1-31, *" />
        <label for="cronMonth">Mes:</label>
        <input type="text" v-model="cronMonth" id="cronMonth" placeholder="1-12, *" />
        <label for="cronDayOfWeek">Día de la Semana:</label>
        <input type="text" v-model="cronDayOfWeek" id="cronDayOfWeek" placeholder="0-6, *" />
        <button @click="saveExecutionTime" class="btn-save">Guardar Horario</button>
      </div>
      <div v-if="selectedSection === 'emails'" class="form-group">
        <label for="emails">Correos de Envío:</label>
        <input type="email" v-model="emails" id="emails" placeholder="Ingrese los correos separados por coma" />
        <button @click="saveEmails" class="btn-save">Guardar Correos</button>
      </div>
      <div v-if="selectedSection === 'backgroundImage'" class="form-group">
        <label for="backgroundImage">Imagen de Fondo:</label>
        <input type="file" @change="onFileChange" id="backgroundImage" />
        <button @click="saveBackgroundImage" class="btn-save">Guardar Imagen</button>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage, updateParameters } from '@/services/lotteryService';

export default {
  data() {
    return {
      cronMinute: '',
      cronHour: '',
      cronDayOfMonth: '',
      cronMonth: '',
      cronDayOfWeek: '',
      emails: '',
      backgroundImage: null,
      selectedSection: 'executionTime', // Sección seleccionada por defecto
    };
  },
  methods: {
    onFileChange(event) {
      this.backgroundImage = event.target.files[0];
    },
    async saveExecutionTime() {
      try {
        const cronMinute = this.cronMinute.trim() === '' ? '*' : this.cronMinute;
        const cronHour = this.cronHour.trim() === '' ? '*' : this.cronHour;
        const cronDayOfMonth = this.cronDayOfMonth.trim() === '' ? '*' : this.cronDayOfMonth;
        const cronMonth = this.cronMonth.trim() === '' ? '*' : this.cronMonth;
        const cronDayOfWeek = this.cronDayOfWeek.trim() === '' ? '*' : this.cronDayOfWeek;

        const cronExpression = `${cronMinute} ${cronHour} ${cronDayOfMonth} ${cronMonth} ${cronDayOfWeek}`;
        await updateParameters({ cronExpression });
        alert(`Horario de ejecución guardado: ${cronExpression}`);
      } catch (error) {
        alert('Error al guardar el horario de ejecución');
      }
    },
    async saveEmails() {
      try {
        await updateParameters({ emails: this.emails });
        alert('Correos de envío guardados');
      } catch (error) {
        alert('Error al guardar los correos de envío');
      }
    },
    async saveBackgroundImage() {
      try {
        if (this.backgroundImage) {
          const formData = new FormData();
          formData.append('file', this.backgroundImage); // Cambiar 'image' a 'file'
          await uploadImage(formData);
          alert('Imagen cargada exitosamente');
        } else {
          alert('Por favor seleccione una imagen');
        }
      } catch (error) {
        alert('Error al cargar la imagen');
      }
    }
  }
};
</script>

<style scoped>
.config-parameters {
  display: flex;
  max-width: 800px;
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

.sidebar {
  width: 200px;
  margin-right: 2em;
  background-color: #f0f0f0;
  padding: 1em;
  border-radius: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 0.5em;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  margin-bottom: 0.5em;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar li.active {
  background-color: #369f6b;
}

.sidebar li:hover {
  background-color: #369f6b;
}

.content {
  flex: 1;
}

.form-group {
  margin-bottom: 1em;
}

label {
  margin-bottom: 0.5em;
  color: #333;
}

input[type="text"],
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
  margin-top: 1em;
}

.btn-save:hover {
  background-color: #369f6b;
}
</style>