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

        <q-btn-dropdown flat round icon="language" dense>
          <q-list>
            <q-item
              clickable
              v-for="lang in languages"
              :key="lang.value"
              @click="changeLanguage(lang.value)"
            >
              <q-item-section>
                {{ lang.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown v-if="isLoggedIn" flat round icon="account_circle" dense>
          <q-list>
            <q-item clickable @click="goToProfile">
              <q-item-section>
                {{ t("profileButton.myProfile") }}
              </q-item-section>
            </q-item>
            <q-item clickable @click="goToProfileSettings">
              <q-item-section>
                {{ t("profileButton.profileSettings") }}
              </q-item-section>
            </q-item>
            <q-item clickable @click="logoutUser">
              <q-item-section>
                {{ t("profileButton.logout") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <q-item
          v-for="link in filteredLinks"
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
const { t, locale } = useI18n();
const router = useRouter();

const darkMode = ref($q.dark.isActive);
const changeDarkMode = () => {
  $q.dark.toggle();
  if ($q.localStorage) {
    $q.localStorage.set("isDarkActive", $q.dark.isActive);
  }
};

const languages = [
  { value: "en", label: "English" },
  { value: "hr", label: "Hrvatski" },
];
const currentLang = ref($q.localStorage?.getItem("language") || "hr");

const changeLanguage = (value) => {
  locale.value = value;
  currentLang.value = value;
  if ($q.localStorage) {
    $q.localStorage.set("language", value);
  }
};

const isLoggedIn = ref(false);

const linksList = [
  { title: t("essentialLinks.home"), caption: t("essentialLinks.homeCaption"), icon: "home", link: "/" },
  { title: t("essentialLinks.register"), caption: t("essentialLinks.registerCaption"), icon: "code", link: "/register" },
  { title: t("essentialLinks.login"), caption: t("essentialLinks.loginCaption"), icon: "login", link: "/login" },
  { title: t("essentialLinks.studios"), caption: t("essentialLinks.studiosCaption"), icon: "store", link: "/studios", requiresAuth: true },
  { title: t("essentialLinks.appointments"), caption: t("essentialLinks.appointmentsCaption"), icon: "book", link: "/appointments", requiresAuth: true },
  { title: t("essentialLinks.aftercare"), caption: t("essentialLinks.aftercareCaption"), icon: "medication", link: "/aftercare", requiresAuth: true },
  { title: t("essentialLinks.about"), caption: t("essentialLinks.aboutCaption"), icon: "info", link: "/about" },
  { title: t("essentialLinks.contactUs"), caption: t("essentialLinks.contactUsCaption"), icon: "message", link: "/contactUs" },
];

const filteredLinks = computed(() => {
  return linksList.filter((link) => !link.requiresAuth || isLoggedIn.value);
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToProfile() {
  router.push("/profile");
}

function goToProfileSettings() {
  router.push("/profile/settings");
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

<style scoped>
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
}

.custom-toggle .q-toggle__thumb {
  background-color: #ffffff !important;
  border: none !important;
  box-shadow: none !important;
  border-radius: 50% !important;
}

.q-btn-dropdown {
  margin-left: 10px;
}

.q-btn-dropdown .q-btn {
  color: inherit;
}
</style>
