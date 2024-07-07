<template>
    <div>
      <h1>FORGOT PASSWORD</h1>
      <main class="d-flex align-items-center justify-content-center">
        <div class="card p-3 border-warning">

            <h2>Forgot Password</h2>

            <span>Please enter a registered e-mail</span>

          <form @submit.prevent="authStore.handleForgotPw(form.email)">

            <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="example@xmail.com"
                v-model="form.email"
                aria-describedby="emailHelp"
              />
              <div
              v-if="authStore.errors.email"
              id="emailHelp"
              class="form-text"
            >
              <span
                v-for="er in authStore.errors.email"
                class="text-danger"
                >{{ er }}</span
              >
            </div>
            </div>
            <button type="submit" class="btn btn-warning">Invia richiesta</button>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "../stores/auth";
  
  const authStore = useAuthStore()
  
  const form = ref({
    email: "",
  });
  </script>
  
  <style lang="scss" scoped></style>
  