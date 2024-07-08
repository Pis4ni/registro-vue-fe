<template>
  <div class="container">
    <h1>Student</h1>
    <div class="card">
      <div class="card-body">
        <div v-if="authStore.student.student">

            <div class="card-header">
                <h2>
                    {{ authStore.student.student.name }} {{ authStore.student.student.surname }}
                </h2>
            </div>
            <div>
              Id
              <span v-if="authStore.student.student.id">
                {{ authStore.student.student.id }}
              </span>
            </div>
            <div>
              Nome
              <span v-if="authStore.student.student.name">
                {{ authStore.student.student.name }}
              </span>
            </div>
            <div>
                cognome
                <span v-if="authStore.student.student.surname">
                {{ authStore.student.student.surname }}
              </span>
            </div>
            <div>
                data di nascita
                <span v-if="authStore.student.student.date_of_birth">
                {{ authStore.student.student.date_of_birth }}
              </span>
            </div>
            <div>
                classe
                <span v-if="authStore.student.student.class">
                {{ authStore.student.student.class }}
              </span>
            </div>
            <div>
                sezione
                <span v-if="authStore.student.student.section">
                {{ authStore.student.student.section }}
              </span>
            </div>
            <div>
                istituto
                <span  v-if="authStore.student.student.institute_id && authStore.institute.institute">
                {{ authStore.institute.institute.name}}
              </span>
            </div>

            <div>
                
            </div>
          </div>
          <div v-else>Loading</div>
        </div>
    </div>
    <router-link :to="{ name: 'studentList' }"
      ><button class="btn btn-outline-primary">
        Back to students List
      </button></router-link
    >
    <router-link :to="{ name: 'studentList' }"
      ><button class="btn btn-outline-warning">
        <font-awesome-icon :icon="faEdit" />
      </button></router-link
    >
    <router-link :to="{ name: 'studentList' }"
      ><button class="btn btn-outline-danger">
        <font-awesome-icon :icon="faTrash" />
      </button></router-link
    >
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const route = useRoute();

const id = computed(() => {
  return route.params.id;
});

const authStore = useAuthStore();

const student12 = computed(()=>{return authStore.student.student})

console.log(student12 + 'LOG DI STUDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');


onMounted(() => {
    if (authStore) {
        
        authStore.getStudentFromId(id.value);
    }
});
</script>

<style lang="scss" scoped></style>
