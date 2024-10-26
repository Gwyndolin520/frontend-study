import { createRouter,createWebHistory } from "vue-router";

import Counter from "../views/Counter.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    redirect:"/router",
  },
  {
    path: "/counter",
    name: "Counter",
    component: Counter,
  },
  {
    path: "/todo",
    name: "Todo",
    component: () => import("../views/Todo.vue"),
  },
  {
    path: "/book",
    name: "Book",
    component: () => import("../views/Book.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/profile.vue"),
  },
];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;