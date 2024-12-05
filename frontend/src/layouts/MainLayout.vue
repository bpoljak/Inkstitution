<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Inkstitution
        </q-toolbar-title>

        <div class="dark-mode-toggle">
          <q-icon name="light_mode" size="sm" />
          <q-toggle
            v-model="darkMode"
            dense
            @update:model-value="changeDarkMode"
            class="custom-toggle"
          />
          <q-icon name="dark_mode" size="sm" />
        </div>

        <div v-if="isLoggedIn" class="q-gutter-sm row items-center">
          <q-btn
            flat
            dense
            round
            icon="account_circle"
            aria-label="Profile"
            @click="goToProfile"
          />
          <q-btn
            flat
            dense
            round
            icon="logout"
            aria-label="Logout"
            @click="logoutUser"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="router-link"
          :to="link.link"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const { t } = useI18n();
const router = useRouter();

const darkMode = ref($q.dark.isActive);
const changeDarkMode = () => {
  $q.dark.toggle();
  $q.localStorage.set("isDarkActive", $q.dark.isActive);
};

const linksList = computed(() => [
  { title: t("essentialLinks.home"), caption: t("essentialLinks.homeCaption"), icon: "home", link: "/" },
  { title: t("essentialLinks.register"), caption: t("essentialLinks.registerCaption"), icon: "code", link: "/register" },
  { title: t("essentialLinks.login"), caption: t("essentialLinks.loginCaption"), icon: "login", link: "/login" },
  { title: t("essentialLinks.studios"), caption: t("essentialLinks.studiosCaption"), icon: "store", link: "/studios" },
  { title: t("essentialLinks.appointments"), caption: t("essentialLinks.appointmentsCaption"), icon: "book", link: "/appointments" },
  { title: t("essentialLinks.aftercare"), caption: t("essentialLinks.aftercareCaption"), icon: "medication", link: "/aftercare" },
  { title: t("essentialLinks.about"), caption: t("essentialLinks.aboutCaption"), icon: "info", link: "/about" },
  { title: t("essentialLinks.contactUs"), caption: t("essentialLinks.contactUsCaption"), icon: "message", link: "/contactUs" },
  { title: t("essentialLinks.settings"), caption: t("essentialLinks.settingsCaption"), icon: "settings", link: "/settings" },
]);

const leftDrawerOpen = ref(false);
const isLoggedIn = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToProfile() {
  router.push("/profile");
}

function logoutUser() {
  axios
    .post(`${process.env.API_URL}/api/users/logout`, {}, { withCredentials: true })
    .then(() => {
      isLoggedIn.value = false;
      router.push("/login");
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
}

onMounted(async () => {
  await checkLoginStatus();
});

onBeforeRouteUpdate((to, from, next) => {
  checkLoginStatus().then(() => {
    next();
  });
});

async function checkLoginStatus() {
  await axios
    .get(`${process.env.API_URL}/api/users/session`, { withCredentials: true })
    .then((response) => {
      if (response.data && response.data.userName) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    })
    .catch(() => {
      isLoggedIn.value = false;
    });
}
</script>

<style>
.q-toolbar-title {
  flex-grow: 1;
}

.row {
  gap: 10px;
}

.dark-mode-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-toggle .q-toggle__track {
  background-color: #e0e0e0 !important;
  border: none !important;
  box-shadow: none !important;
  transition: none !important;
}

.custom-toggle .q-toggle__thumb {
  background-color: #ffffff !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 50% !important;
  transition: none !important;
}

.custom-toggle .q-toggle__thumb--on,
.custom-toggle .q-toggle__thumb--off {
  background-color: #ffffff !important;
  border: none !important;
  box-shadow: none !important;
}





</style>
