import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    authErrors: [],
    apiErrors: [],
    studentsList: [],
    institutesList: [],
    studentObj: {},
    instituteObj:{},
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    students: (state) => state.studentsList,
    student: (state) => state.studentObj,
    institute: (state) => state.instituteObj,
    institutes: (state) => state.institutesList,

  },
  actions: {
    async getToken() {
      await axios.get("/sanctum/csrf-cookie");
    },

    async getUser() {
      this.getToken();
      const data = await axios.get("/api/user");
      this.authUser = data.data;
    },

    async handleLogin(data) {
      this.authErrors = [];

      await this.getToken();

      try {
        await axios.post("/login", {
          email: data.email,
          password: data.password,
        });

        this.router.push("/");
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },

    async handleRegister(data) {
      await this.getToken();
      try {
        await axios.post("/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        this.router.push("/");
        // Handle successful registration (e.g., display success message)
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          this.authErrors = error.response.data.errors;
          console.error("An error occurred:", error);
        }
      }
    },

    async handleLogout() {
      await axios.post("/logout");
      this.authUser = null;
      this.router.push("/");
    },

    async handleForgotPw(email) {
      this.authErrors = [];

      this.getToken();

      try {
        console.log("try block", email);

        await axios.post("/forgot-password", {
          email: email,
        });
      } catch (error) {
        console.log(
          "Catch block no good bitch" +
            "\n" +
            "la chiamata a forgot-password non è andata a buon fine" +
            "\n" +
            "La mail che è passata come parametro è: " +
            email +
            "\n" +
            "Lo stato dell errore è -> " +
            error.response.status +
            "\n" +
            "Porcoddio"
        );
        console.error(
          "la chiamata a forgot-password non è andata a buon fine" +
            "\n" +
            "La mail che è passata come parametro è: " +
            email +
            "\n" +
            "Lo stato dell errore è -> " +
            error.response.status +
            "\n" +
            "Porcoddio"
        );

        if (error.response.status == 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },

    async handleResetPw(resetData) {
      this.authErrors = [];

      try {
        await axios.post("/reset-password", resetData);
        this.router.push("/");
      } catch (error) {
        if (error.response.status == 422) {
          this.authErrors = error.response.data.errors;
        }
      }
    },

    async getStudents() {
      try {
        const response = await axios.get("api/students");
        console.log("Dati fetchati:", response.data);
        this.setStudentsList(response.data.students); // Usa una mutazione per aggiornare lo stato
        console.log("Students aggiornati:", this.studentsList); // Corretto log
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 419:
              console.error("Non sei autorizzato, devi effettuare il login prima.");
              break;
            case 500:
              console.error("Qualcosa è andato storto sul server.");
              break;
            default:
              console.error("Errore durante la chiamata API:", error.response.status);
              break;
          }
        } else if (error.request) {
          console.error("Nessuna risposta ricevuta dalla chiamata API.");
        } else {
          console.error("Errore durante l'esecuzione della chiamata API:", error.message);
        }
      }
    },
    
    async getInstitutes() {
      try {
        const response = await axios.get("api/institute");
        console.log("Dati fetchati:", response.data);
        this.setInstitutesList(response.data.institutes); // Usa una mutazione per aggiornare lo stato
        console.log("institutes aggiornati:", this.studentsList); // Corretto log
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 419:
              console.error("Non sei autorizzato, devi effettuare il login prima.");
              break;
            case 500:
              console.error("Qualcosa è andato storto sul server.");
              break;
            default:
              console.error("Errore durante la chiamata API:", error.response.status);
              break;
          }
        } else if (error.request) {
          console.error("Nessuna risposta ricevuta dalla chiamata API.");
        } else {
          console.error("Errore durante l'esecuzione della chiamata API:", error.message);
        }
      }
    },

    async getInstituteStudents(instituteId) {
      try {
        let url = `api/institute/${instituteId}/students`
        const response = await axios.get(url);
        console.log("Dati fetchati:", response.data);
        this.setStudentsList(response.data.students);
        console.log("Students aggiornati:", this.studentsList); // Corretto log
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 419:
              console.error("Non sei autorizzato, devi effettuare il login prima.");
              break;
            case 500:
              console.error("Qualcosa è andato storto sul server.");
              break;
            default:
              console.error("Errore durante la chiamata API:", error.response.status);
              break;
          }
        } else if (error.request) {
          console.error("Nessuna risposta ricevuta dalla chiamata API.");
        } else {
          console.error("Errore durante l'esecuzione della chiamata API:", error.message);
        }
      }
    },

    async getInstituteFromId(instituteId) {
      try {
        let url = `api/institute/${instituteId}`
        const response = await axios.get(url);
        console.log("Dati fetchati:", response.data);
        this.setInstituteObj(response.data);
        console.log("Insstitute aggiornatio", this.instituteObj); // Corretto log
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 419:
              console.error("Non sei autorizzato, devi effettuare il login prima.");
              break;
            case 500:
              console.error("Qualcosa è andato storto sul server.");
              break;
            default:
              console.error("Errore durante la chiamata API:", error.response.status);
              break;
          }
        } else if (error.request) {
          console.error("Nessuna risposta ricevuta dalla chiamata API.");
        } else {
          console.error("Errore durante l'esecuzione della chiamata API:", error.message);
        }
      }
    },

    async getStudentFromId(id) {
      try {
        this.StudentObj = {}
        let url = `api/students/${id}`
        const response = await axios.get(url);
        console.log("Dati fetchati:", response.data);
        this.setStudentObj(response.data); // mutazione per aggiornare lo stato
        console.log("Student aggiornato:", this.StudentObj); // Corretto log
        if (response.data.student && response.data.student.institute_id) {
          await this.getInstituteFromId(response.data.student.institute_id);
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 419:
              console.error("Non sei autorizzato, devi effettuare il login prima.");
              break;
            case 500:
              console.error("Qualcosa è andato storto sul server.");
              break;
            default:
              console.error("Errore durante la chiamata API:", error.response.status);
              break;
          }
        } else if (error.request) {
          console.error("Nessuna risposta ricevuta dalla chiamata API.");
        } else {
          console.error("Errore durante l'esecuzione della chiamata API:", error.message);
        }
      }
    },

    async handleStudentCreate(data){
      await this.getToken();
      try {
        await axios.post("api/students", {
          name: data.name,
          surname: data.surname,
          date_of_birth: data.dob,
          class: data.class,
          section: data.section,
          institute_id: data.instituteId
        });
        this.router.push("/students");
        // Handle successful registration (e.g., display success message)
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          this.authErrors = error.response.data.errors;
          console.error("An error occurred:", error);
        }
      }
    },

    async handleStudentUpdate(data,id){
      await this.getToken();
      try {
        let url = `api/students/${id}`
        await axios.put(url, {
          name: data.name,
          surname: data.surname,
          date_of_birth: data.dob,
          class: data.class,
          section: data.section,
          institute_id: data.instituteId
        });
        this.router.push("/students");
        // Handle successful registration (e.g., display success message)
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response.data.errors;
        } else {
          this.authErrors = error.response.data.errors;
          console.error("An error occurred:", error);
        }
      }
    },

    async deleteStudent(id){
      try {
        await axios.delete(`/api/students/${id}`);
        this.getStudents()
        this.router.push("/students");
      } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
      }
    },
    
    setStudentsList(students) {
      this.studentsList = students; // Aggiorna lo stato usando una mutazione
    },

    setStudentObj(student){
      this.studentObj = student // Aggiorna lo stato usando una mutazione
    },

    setInstituteObj(institute){
      this.instituteObj = institute // Aggiorna lo stato usando una mutazione
    },
    setInstitutesList(institute){
      this.institutesList = institute // Aggiorna lo stato usando una mutazione
    },

  },
});
