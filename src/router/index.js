import {createRouter, createWebHistory} from "vue-router";

import Home from "../components/Home.vue";

const routes = [
    { path: '/', name:"Home",component: Home},
    { path: '/login', name:"Login",component: () => import("../components/Login.vue")},
    { path: '/register',name:"Register", component: () => import("../components/Register.vue")},
    { path: '/forgot-pw',name:"forgotPw", component: () => import("../components/ForgotPw.vue")},
    { path: '/password-reset/:token',name:"resetPw", component: () => import("../components/ResetPassword.vue")},
    { path: '/students',name:"studentList", component: () => import("../components/StudentList.vue")},
    { path: '/student/create',name:"studentCreate", component: () => import("../components/StudentCreate.vue")},
    { path: '/student/update/:id',name:"studentUpdate", component: () => import("../components/StudentUpdate.vue")},
    { path: '/students/:id',name:"studentRead", component: () => import("../components/StudentRead.vue")},
    { path: '/:institute_id/students',name:"studentFromInstitute", component: () => import("../components/StudentListInstitute.vue")},

    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;