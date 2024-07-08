<template>
  
  <div class="container">
    <h1>studentList</h1>
    <router-link  :to="{name:'studentCreate'}">
      <button class="btn btn-outline-primary">
        <font-awesome-icon :icon="faUserPlus" /> Add Student
      </button>
    </router-link>
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
              <router-link :to="{name:'studentRead',  params: { id: student.id }}">
                <font-awesome-icon :icon="faEye" />
              </router-link>
              <router-link class="text-warning ms-3" :to="{name:'studentUpdate', params: { id: student.id }}">
                <font-awesome-icon :icon="faEdit" />
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
import { onMounted, ref } from "vue";


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faTrash, faEdit, faEye , faPlus, faUserPlus} from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();


onMounted(() => {
  authStore.getStudents();
});
</script>

<style lang="scss" scoped>
.pointer{
  cursor: pointer;
}
</style>
