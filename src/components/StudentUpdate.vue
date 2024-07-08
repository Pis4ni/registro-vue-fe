<template>
  <div class="container">
    <h1>Student Update</h1>
    <form v-if="authStore.student.student" @submit.prevent="authStore.handleStudentUpdate(form, id)">
      <!-- NAME -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          :placeholder="authStore.student.student.name"
          v-model="form.name"
          aria-describedby="nameHelp"
        />
        <div v-if="authStore.errors.name" id="nameHelp" class="form-text">
          <span class="text-danger">{{ authStore.errors.name[0] }}</span>
        </div>
        <div v-else id="nameHelp" class="form-text text-warning">Old student name: {{ authStore.student.student.name }}</div>
      </div>

      <!-- SURNAME -->
      <div class="mb-3">
        <label for="surname" class="form-label">Surname</label>
        <input
          type="text"
          class="form-control"
          id="surname"
          :placeholder="authStore.student.student.surname"
          v-model="form.surname"
          aria-describedby="surnameHelp"
        />
        <div v-if="authStore.errors.surname" id="surnameHelp" class="form-text">
          <span class="text-danger">{{ authStore.errors.surname[0] }}</span>
        </div>
        <div v-else id="surnameHelp" class="form-text text-warning">Old student surname: {{ authStore.student.student.surname }}</div>
      </div>
    
      <!-- DATE OF BIRTH -->
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
          <span v-for="er in authStore.errors.dob" class="text-danger">{{ er }}</span>
        </div>
        <div v-else id="dobHelp" class="form-text text-warning">Old date value: {{ authStore.student.student.date_of_birth }}</div>
      </div>

      <!-- CLASS -->
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
          <span v-for="er in authStore.errors.class" class="text-danger">{{ er }}</span>
        </div>
        <div v-else class="form-text text-warning">Old class value: {{ authStore.student.student.class }}</div>
      </div>
    
      <!-- SECTION -->
      <div class="mb-3">
        <label for="section" class="form-label">Section</label>
        <select v-model="form.section" class="form-select" aria-label="section" aria-describedby="sectionHelp">
          <option selected>Select a valid section</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
        </select>
        <div v-if="authStore.errors.section" id="sectionHelp" class="form-text">
          <span v-for="er in authStore.errors.section" class="text-danger">{{ er }}</span>
        </div>
        <div v-else class="form-text text-warning">Old student section: {{ authStore.student.student.section }}</div>
      </div>
    
      <!-- INSTITUTE -->
      <div class="mb-3">
        <label for="institute" class="form-label">Institute</label>
        <select v-model="form.instituteId" class="form-select" aria-label="institute" aria-describedby="instituteHelp">
          <option selected>Select a valid institute</option>
          <option v-for="institute in authStore.institutes" :value="institute.code">{{ institute.name }}</option>
        </select>
        <div v-if="authStore.errors.instituteId" id="instituteHelp" class="form-text">
          <span v-for="er in authStore.errors.instituteId" class="text-danger">{{ er }}</span>
        </div>
        <div v-if="authStore.institute.institute" class="form-text text-warning">Old student institute: {{ authStore.institute.institute.name }}</div>
      </div>

      <button type="submit" class="btn btn-outline-warning my-3">Update Student</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const id = computed(() => {
  return route.params.id;
});

// Inizializza il form con i dati dello studente corrente
const form = ref({
  name: '',
  surname: '',
  dob: '',
  class: 0,
  section: '',
  instituteId: '',
});

// Ottieni l'elenco degli istituti al montaggio del componente
onMounted(() => {
  authStore.getInstitutes();
  authStore.getStudentFromId(id.value).then(() => {
    // Popola il form con i dati dello studente solo se esiste
    if (authStore.student.student) {
      form.name = authStore.student.student.name;
      form.surname = authStore.student.student.surname;
      form.dob = authStore.student.student.date_of_birth;
      form.class = authStore.student.student.class;
      form.section = authStore.student.student.section;
      form.instituteId = authStore.student.student.institute_id;
    }
    authStore.getInstituteFromId(authStore.student.student.institute_id)
  });
});
</script>

<style lang="scss" scoped>
/* Stili se necessario */
</style>
