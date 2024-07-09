<template>
    <main>
        <div class="container">

            <h1>Registro Elettronico</h1>
            <h2 v-if="authStore.user">
                welcome back {{ authStore.user.name }}
            </h2>
            <h2 v-else>
                Login or Register
            </h2>
            
            <router-link :to="{name: 'studentList'}">
                <button class="btn btn-outline-primary">
                    go to student list
                </button>
            </router-link>
        </div>

    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

onMounted(
    async () => {
        await authStore.getUser();
    }
)

</script>

<style lang="scss" scoped>

</style>