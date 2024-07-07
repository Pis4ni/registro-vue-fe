<template>
  <div>
    <h1>REGISTER</h1>
    <main class="d-flex align-items-center justify-content-center">
      <div class="">
        <form @submit.prevent="authStore.handleRegister(form)">
          <!-- * NAME -->
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Mario"
              v-model="form.name"
              aria-describedby="nameHelp"
            />
            <div v-if="authStore.errors.email" id="emailHelp" class="form-text">
              <span class="text-danger">{{ authStore.errors.name[0] }}</span>
            </div>
            <div v-else id="emailHelp" class="form-text">Insert your name</div>
          </div>
          <!-- * EMAIL -->
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="example@xmail.com"
              v-model="form.email"
              aria-describedby="emailHelp"
            />

            <div v-if="authStore.errors.email" id="emailHelp" class="form-text">
              <span class="text-danger">{{ authStore.errors.email[0] }}</span>
            </div>
            <div v-else id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <!-- * PASSWORD -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="********"
              v-model="form.password"
              aria-describedby="passwordHelp"
            />
            <div v-if="authStore.errors.password" id="passwordHelp" class="form-text">
              <span v-for="er in authStore.errors.password" class="text-danger">{{ er }}</span>
            </div>
            <div v-else id="emailHelp" class="form-text">
              Use a strong password!
            </div>
          </div>

          <!-- * PASSWORD CONFIRM -->
          <div class="mb-3">
            <label for="password" class="form-label">Password Confirm</label>
            <input
              type="password"
              class="form-control"
              id="passwordConf"
              placeholder="********"
              v-model="form.password_confirmation"
              aria-describedby="passwordConfirmationHelp"
            />
            <div v-if="form.password !== form.password_confirmation" id="passwordConfirmationHelp" class="form-text">
              <span class="text-danger">passwords must be the same</span>
            </div>
            <div v-else id="emailHelp" class="form-text">
              <div class="d-flex">
                <span v-if="containsBothCases(form.password)" :class="'secureRating '+ secureColor(form.password)">Both cases &#10003; </span>
                <span v-if="containsNumbers(form.password)" :class="'secureRating '+ secureColor(form.password)">Numbers &#10003; </span>
                <span v-if="containsSymbols(form.password)" :class="'secureRating '+ secureColor(form.password)">Symbols &#10003; </span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign-Up</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

let secLv = 0;

function containsBothCases(str) {
  return /[A-Z]/.test(str) && /[a-z]/.test(str);
}

function containsSymbols(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

function containsNumbers(str) {
  return /[0-9]/.test(str);
}

function secureColor(str){
  let color = "";
  let secureLevel = 0
  
  if (containsBothCases(str)) {
    secureLevel++
  }
  if ( containsNumbers(str)) {
    secureLevel++
  }
  if (containsSymbols(str)) {
    secureLevel++
  }
  if (secureLevel == 3) {
    color = 'bg-success text-light'
  }else  if (secureLevel == 2) {
    color = 'bg-warning text-dark'
  }else{
    color = 'bg-danger text-light'
  }
  // console.log('Securecolor chiama: \n'
  // + '\n la password è -> ' + str
  // + "\n l'esito del test maiusc minusc è -> "+ containsBothCases(str) 
  // + "\n l'esito del test numeri è -> "+ containsNumbers(str) 
  // + "\n l'esito del test symbol è -> "+ containsSymbols(str) 
  // + "\n il livello sicurezza è -> "+ secureLevel 
// );
  
  return color
}


</script>

<style lang="scss" scoped>

.secureRating{
  width: calc(100%/3);
  border-radius: 5px;
  text-align: center;
  font-weight: 700;
  margin:5px 0;
}

</style>
