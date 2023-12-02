<template>
    <div>
        <Navbar />
        <Searchbar />
        <RouterView />
    </div>
</template>

<script setup>
import Navbar from '@components/primary/Navbar.vue'
import Searchbar from '@components/primary/Searchbar.vue'
</script>

<style lang="scss" scoped></style>