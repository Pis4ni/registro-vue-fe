<template>
  
  <div class="container">
    <h1>studentList</h1>
    <!-- <router-link to="">
      ciao
      <font-awesome-icon icon="plus" />
    </router-link> -->
    <div class="table-responsive">
      <table class="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Cognome</th>
            <th scope="col">Classe</th>
            <th scope="col">Sezione</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in authStore.students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.surname }}</td>
            <td>{{ student.class }}</td>
            <td>{{ student.section }}</td>
            <td>
              <router-link to="">
                <font-awesome-icon :icon="faTrash" />
              </router-link>
              <router-link to="">
                <font-awesome-icon :icon="faEdit" />
              </router-link>
              <router-link to="">
                <font-awesome-icon :icon="faEye" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faTrash, faEdit, faEye,} from "@fortawesome/free-solid-svg-icons";

const route = useRoute();

const instituteId = computed(() => {
  return route.params.institute_id;
});

const authStore = useAuthStore();
const students = ref([]); // Usa ref per rendere reattiva la variabile

onMounted(() => {
  authStore.getInstituteStudents(instituteId.value);
});
</script>

<style lang="scss" scoped>
/* Il tuo stile qui */
</style>

<!-- todo CREATE-->
<!-- todo READ-->
<!-- todo UPDATE-->
<!-- todo DELETE-->
