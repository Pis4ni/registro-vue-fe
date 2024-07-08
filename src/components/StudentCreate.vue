<template>
  <div class="container">

    <h1>Add New Student</h1>
    <form @submit.prevent="authStore.handleStudentCreate(form)">
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
        <div v-if="authStore.errors.name" id="nameHelp" class="form-text">
          <span class="text-danger">{{ authStore.errors.name[0] }}</span>
        </div>
        <div v-else id="nameHelp" class="form-text">Insert your name</div>
      </div>

      <!-- * SURNAME -->
      <div class="mb-3">
        <label for="email" class="form-label">Surame</label>
        <input
          type="text"
          class="form-control"
          id="surname"
          placeholder="rossi"
          v-model="form.surname"
          aria-describedby="surnameHelp"
        />

        <div
          v-if="authStore.errors.surnname"
          id="surnameHelp"
          class="form-text"
        >
          <span class="text-danger">{{ authStore.errors.surnname[0] }}</span>
        </div>
        <div v-else id="surnameHelp" class="form-text">Insert your surname</div>
      </div>

      <!-- * date_of_birth -->
      <div class="mb-3">
        <label for="dob" class="form-label">Date of birth</label>
        <input
          type="date"
          class="form-control"
          id="dob"
          v-model="form.dob"
          aria-describedby="dobHelp"
        />
        <div v-if="authStore.errors.dob" id="dobHelp" class="form-text">
          <span v-for="er in authStore.errors.dob" class="text-danger">{{
            er
          }}</span>
        </div>
        <div v-else id="emailHelp" class="form-text">
          Insert your birth date
        </div>
      </div>

      <!-- * class -->
      <div class="mb-3">
        <label for="class" class="form-label">Class</label>
        <input
          type="number"
          class="form-control"
          id="class"
          v-model="form.class"
          aria-describedby="classHelp"
        />
        <div v-if="authStore.errors.class" id="classHelp" class="form-text">
          <span v-for="er in authStore.errors.class" class="text-danger">{{
            er
          }}</span>
        </div>
        <div v-else>
          <span class="text-danger">Insert the class of the student</span>
        </div>
    </div>
    
      <!-- *SECTION -->
      <label for="section" class="form-label">Section</label>
      <select  v-model="form.section" class="form-select" aria-label="section" aria-describedby="sectionHelp">
        <option selected>Select a valid section</option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="e">E</option>
      </select>
      <div v-if="authStore.errors.section" id="sectionHelp" class="form-text">
        <span v-for="er in authStore.errors.section" class="text-danger">{{
          er
        }}</span>
      </div>
      <div v-else>
        <span class="text-danger">Insert the section of the student</span>
      </div>

      <!-- *INSTITUTE -->
      <label for="institute" class="form-label">institute</label>
      <select  v-model="form.instituteId" class="form-select" aria-label="institute" aria-describedby="instituteHelp">
        <option selected>Select a valid institute</option>
        <option v-for="institute in authStore.institutes" :value="institute.code">{{ institute.name }}</option>

      </select>
      <div v-if="authStore.errors.section" id="sectionHelp" class="form-text">
        <span v-for="er in authStore.errors.section" class="text-danger">{{
          er
        }}</span>
      </div>
      <div v-else>
        <span class="text-danger">Insert the section of the student</span>
      </div>

      <button type="submit" class="btn btn-primary my-3">Add Student</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import { useAuthStore } from "../stores/auth";


onMounted(() => {
  authStore.getInstitutes();
});

const authStore = useAuthStore();

const form = ref({
  name: "",
  surname: "",
  dob: "",
  class: 0,
  section: "",
  instituteId: "",
});
</script>

<style lang="scss" scoped></style>
