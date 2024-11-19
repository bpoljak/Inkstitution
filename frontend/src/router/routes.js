const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "settings", component: () => import("pages/SettingsPage.vue") },
      { path: "studios", component: () => import("pages/StudiosPage.vue") },
      { path: "email", component: () => import("pages/EmailPage.vue") },
      {
        path: "appointments",
        component: () => import("pages/AppointmentsPage.vue"),
      },
      { path: "aftercare", component: () => import("pages/AftercarePage.vue") },
      { path: "contactUs", component: () => import("pages/ContactUsPage.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
