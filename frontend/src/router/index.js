import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth/RegisterView.vue"),
  },
  {
    path: "/realcomics",
    name: "realcomics",
    component: () =>
      import(
        /* webpackChunkName: "sections" */ "../views/SectionReal/RealComics.vue"
      ),
  },
  {
    path: "/animatedcomics",
    name: "animatedcomics",
    component: () =>
      import(
        /* webpackChunkName: "sections" */ "../views/SectionAnimated/AnimatedComics.vue"
      ),
  },
  {
    path: "/generalcontent",
    name: "generalcontent",
    component: () =>
      import(
        /* webpackChunkName: "sections" */ "../views/SectionAnimated/AnimatedComics.vue"
      ),
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/upload",
    name: "Upload",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/viewserie/:id",
    name: "viewserie",
    component: () =>
      import(/* webpackChunkName: "viewserie"*/ "../components/SeeSerie.vue"),
  },
  {
    path: "/viewcomic/:id",
    name: "viewcomic",
    component: () =>
      import(/* webpackChunkName: "viewcomic" */ "../components/SeeComic.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) return "/login";
});

export default router;
