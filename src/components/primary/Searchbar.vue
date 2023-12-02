<template>
    <input type="text" placeholder="Search" class="w-full px-4 py-2 bg-gray-100 border-b border-gray-600 outline-none"
        v-model="text">
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<style lang=" scss" scoped>
</style>