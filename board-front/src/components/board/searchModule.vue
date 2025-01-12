<template>
    <div class="search-container" >
        <div class="search-form">
            <q-select filled v-model="model" :options="options"/>
            <q-input filled v-model="text">
                <template v-slot:append>
                    <q-btn icon="close" flat round @click="onClear" />
                </template>
            </q-input>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    display: flex;
    flex-direction: row;
    justify-content: center;    
}
.search-form {
    display: flex;
    flex-direction: row;        
    gap: 20px;
    padding: 10px 50px 10px 50px;    
}
</style>

<script setup>
import { ref } from 'vue'

const model = ref();

const options = [
  { label: 'First Option', value: 1 },
  { label: 'Second Option', value: 2 },
  { label: 'Third Option', value: 3 },
];

</script>