<template>
    <div>
        <h1>Resultados de Lotería</h1>
        <button @click="fetchResults">Obtener Resultados</button>
        <div v-if="results">
            <ul>
                <li v-for="(result, index) in results" :key="index">
                    {{ result }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getLotteryResults } from '../services/lotteryService.js';

export default {
    data() {
        return {
            results: null,
        };
    },
    methods: {
        async fetchResults() {
            try {
                this.results = await getLotteryResults();
            } catch (error) {
                alert('Error al obtener los resultados de lotería');
            }
        },
    },
};
</script>

<style scoped>
h1 {
    color: #2c3e50;
}
</style>