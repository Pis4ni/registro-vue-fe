<template>
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <router-link :to="{name:'Home'}"class="navbar-brand">Registro</router-link> 

    <div v-if="authStore.user" class="d-flex">
      <button class="btn btn-outline-danger" @click="authStore.handleLogout" >
        Log-Out
      </button>
    </div>
    <div v-else class="d-flex">
        <RouterLink :to="{name: 'Register'}" class="btn btn-outline-primary mx-2" aria-current="page" href="#">Sign-Up</RouterLink>
        
        <RouterLink :to="{name: 'Login'}" class="btn btn-outline-success mx-2" aria-current="page" href="#">log-In</RouterLink>
    </div>

  </div>
</nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

</script>

<style lang="scss" scoped></style>
