<template>
  <div>
    <h1>LOGIN</h1>
    <main class="d-flex align-items-center justify-content-center">
      <div class="">
        <form @submit.prevent="authStore.handleLogin(form)">
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="example@xmail.com"
              v-model="form.email"
              aria-describedby="emailHelp"
            />
            <div v-if="authStore.errors.email" id="emailHelp" class="form-text">
              <span class="text-danger" >{{ authStore.errors.email[0] }}</span>
            </div>
            <div v-else id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="********"
              v-model="form.password"
              aria-describedby="passwordHelp"
            />
            <div v-if="authStore.errors.password" id="passwordHelp" class="form-text">
              <span class="text-danger" >{{ authStore.errors.password[0] }}</span>
            </div>
            <div v-else class="form-text">
              <router-link :to="{name:'forgotPw'}" class="text-warning">
                Forgot your password?
              </router-link>
            </div>
          </div>
          <button type="submit" class="btn btn-success">Log-In</button>
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
  password: "",
});
</script>

<style lang="scss" scoped></style>
