<template>
  <div class="container">
    <h1>Student</h1>
    <div class="card">
      <div class="card-body">
        <div v-if="student">
          <div class="card-header">
            <h2>
              {{ student.name }} {{ student.surname }}
            </h2>
          </div>
          <div>
            Id
            <span v-if="student.id">
              {{ student.id }}
            </span>
          </div>
          <div>
            Nome
            <span v-if="student.name">
              {{ student.name }}
            </span>
          </div>
          <div>
            cognome
            <span v-if="student.surname">
              {{ student.surname }}
            </span>
          </div>
          <div>
            data di nascita
            <span v-if="student.date_of_birth">
              {{ student.date_of_birth }}
            </span>
          </div>
          <div>
            classe
            <span v-if="student.class">
              {{ student.class }}
            </span>
          </div>
          <div>
            sezione
            <span v-if="student.section">
              {{ student.section }}
            </span>
          </div>
          <div>
            istituto
            <span v-if="student.institute_id && institute">
              {{ institute.name }}
            </span>
          </div>
        </div>
        <div v-else>Loading</div>
      </div>
    </div>
    <router-link :to="{ name: 'studentList' }">
      <button class="btn btn-outline-primary">
        Back to students List
      </button>
    </router-link>
    <router-link
      v-if="student && student.id"
      :to="{ name: 'studentUpdate', params: { id: student.id } }"
    >
      <button class="btn btn-outline-warning">
        <font-awesome-icon :icon="faEdit" />
      </button>
    </router-link>

      <button class="btn btn-outline-danger" @click="authStore.deleteStudent(student.id)" >
        <font-awesome-icon :icon="faTrash" class="text-danger pointer" />

      </button>

  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const route = useRoute();
const authStore = useAuthStore();

const id = computed(() => route.params.id);

const student = ref(null);
const institute = ref(null);

onMounted(async () => {
  if (id.value) {
    await authStore.getStudentFromId(id.value);
    student.value = authStore.student.student;

    if (student.value && student.value.institute_id) {
      await authStore.getInstituteFromId(student.value.institute_id);
      institute.value = authStore.institute.institute;
    }
  }
});
</script>

<style lang="scss" scoped></style>
