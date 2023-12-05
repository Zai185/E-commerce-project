<template>
    <div>
        <!-- component -->
        <div class="flex flex-col min-h-screen bg-grey-lighter">
            <div class="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
                <form @submit.prevent="register" class="w-full px-6 py-8 text-black bg-white rounded shadow-md">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>

                    <input type="text" class="block w-full p-3 mb-4 border rounded border-grey-light"
                        placeholder="Full Name" v-model="user.name" required />

                    <input type="email" class="block w-full p-3 mb-4 border rounded border-grey-light" placeholder="Email"
                        v-model="user.email" required />

                    <input type="password" class="block w-full p-3 mb-4 border rounded border-grey-light"
                        placeholder="Password" v-model="user.password" required />

                    <input type="password" class="block w-full p-3 mb-4 border rounded border-grey-light"
                        name="confirm_password" placeholder="Confirm Password" v-model="user.password_confirmation"
                        required />
                    <Button type="submit" class="block mx-auto">Create Account</Button>
                    <p class="text-center text-blue-800 ">
                        <RouterLink :to="{ name: 'login' }">Already have an account? Login</RouterLink>
                    </p>

                    <div class="mt-4 text-sm text-center text-grey-dark">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </form>

                <div class="mt-6 text-grey-dark">
                    Already have an account?
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '@components/primary/Button.vue'
import { ref } from 'vue'
import { useAuthStore } from '@store/useAuthStore'
import { useRouter } from 'vue-router'

const user = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})
const router = useRouter()
const authStore = useAuthStore()
const { authRegister } = authStore

function register() {
    authRegister(user.value)
        .then((response) => {
            router.push({ name: 'home' })
        })
}
</script>

<style lang="scss" scoped></style>