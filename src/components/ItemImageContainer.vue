
<template>
    <div>
        <div class="relative w-full h-64 border border-gray-800">
            <div v-if="image_url" class="relative w-full h-full overflow-hidden">
                <img :src="image_url" loading="lazy" alt=""
                    class="object-cover object-center w-full h-full hover:object-contain">
                <Button type="button" class="absolute top-2 right-2" @click="openFile">Change Image</Button>
            </div>
            <div v-else-if="!image_url" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <img src="https://static.thenounproject.com/png/1231023-200.png" alt="" class="block w-12 h-12 mx-auto">
                <Button type="button" @click="openFile">Upload Image</Button>
            </div>
        </div>
        <!-- //^ hidden file input -->
        <input ref="fileInput" type="file" @change="fileChange" class="hidden">
        <div v-if="errorMsg"
            class="absolute w-32 px-4 py-2 font-bold text-red-500 border-2 border-red-500 rounded top-4 right-4 ">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import Button from '@components/primary/Button.vue'
import { useItemStore } from '../store/useItemStore';

const emits = defineEmits(['updateImage'])

const route = useRoute()
const image_url = ref(null)
const errorMsg = ref(null)
const fileInput = ref(null)
const loading = ref(true)

const itemStore = useItemStore()
const { currentItem } = storeToRefs(itemStore)
const { getItem } = itemStore

function fileChange(e) {
    const file = e.target.files[0]
    const maxSize = 3 * 1024 * 1024
    if (file) {

        if (file.size > maxSize) {
            errorMsg.value = 'File Size Exceeded'
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            image_url.value = reader.result
            emits('updateImage', reader.result)
            console.log(reader.result)
        }
        reader.readAsDataURL(file)
    }
}

function openFile() {
    fileInput.value.click()
}

onMounted(() => {
    if (currentItem.value)
        image_url.value = currentItem.value.image
})


</script>

<style lang="scss" scoped></style>