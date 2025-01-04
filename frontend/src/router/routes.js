const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "studios", component: () => import("pages/StudiosPage.vue") },
      {
        path: "studioProfile/:studioId",
        component: () => import("pages/StudioProfilePage.vue"),
      },

      {
        path: "appointments",
        component: () => import("pages/AppointmentsPage.vue"),
      },
      { path: "aftercare", component: () => import("pages/AftercarePage.vue") },
      { path: "contactUs", component: () => import("pages/ContactUsPage.vue") },
      {
        path: "studio-register",
        component: () => import("pages/StudioRegisterPage.vue"),
      },
      {
        path: "appointmentUpdate",
        name: "AppointmentUpdatePage",
        component: () => import("src/pages/AppointmentUpdatePage.vue"),
      },
      {
        path: "appointmentBooking/:studioId",
        name: "AppointmentBookingPage",
        component: () => import("pages/AppointmentBookingPage.vue"),
      },
      {
        path: "profile/:userId",
        name: "UserProfile",
        component: () => import("pages/UserProfilePage.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
