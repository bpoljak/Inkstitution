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

    <div class="floating-language-selector">
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
    </div>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
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
const userId = ref(null);
const userFirstName = ref(null);
const userLastName = ref(null);
const userEmail = ref(null);
const userAccountName = ref(null);

const linksList = [
  { titleKey: "essentialLinks.home", captionKey: "essentialLinks.homeCaption", icon: "home", link: "/" },
  { titleKey: "essentialLinks.register", captionKey: "essentialLinks.registerCaption", icon: "code", link: "/register", hideWhenLoggedIn: true },
  { titleKey: "essentialLinks.login", captionKey: "essentialLinks.loginCaption", icon: "login", link: "/login", hideWhenLoggedIn: true },
  { titleKey: "essentialLinks.studios", captionKey: "essentialLinks.studiosCaption", icon: "store", link: "/studios", requiresAuth: true },
  { titleKey: "essentialLinks.appointments", captionKey: "essentialLinks.appointmentsCaption", icon: "book", link: "/appointments", requiresAuth: true },
  { titleKey: "essentialLinks.aftercare", captionKey: "essentialLinks.aftercareCaption", icon: "medication", link: "/aftercare", requiresAuth: true },
  { titleKey: "essentialLinks.about", captionKey: "essentialLinks.aboutCaption", icon: "info", link: "/about" },
  { titleKey: "essentialLinks.contactUs", captionKey: "essentialLinks.contactUsCaption", icon: "message", link: "/contactUs" },
];

const filteredLinks = computed(() => {
  return linksList.map((link) => ({
    ...link,
    title: t(link.titleKey),
    caption: t(link.captionKey),
  })).filter(
    (link) =>
      (!link.requiresAuth || isLoggedIn.value) &&
      (!link.hideWhenLoggedIn || !isLoggedIn.value)
  );
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function goToProfile() {
  if (userId.value) {
    router.push({ name: "UserProfile", params: { userId: userId.value } });
  }
}

function goToProfileSettings() {
  router.push({ path: `/userSettings` });
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

watch(() => locale.value, () => {});

async function checkLoginStatus() {
  await axios
    .get(`${process.env.API_URL}/api/users/session`, { withCredentials: true })
    .then((response) => {
      if (response.data && response.data.userId) {
        isLoggedIn.value = true;
        userId.value = response.data.userId;
        userFirstName.value = response.data.userFirstName;
        userLastName.value = response.data.userLastName;
        userEmail.value = response.data.userEmail;
        userAccountName.value = response.data.userAccountName;
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
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--q-text-primary);
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  background: linear-gradient(90deg, #6a11cb, #2575fc) !important;
  border-radius: 50px !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3) !important;
}

.custom-toggle .q-toggle__thumb {
  background-color: white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.q-drawer {
  background: linear-gradient(135deg, #232526, #414345);
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.q-item {
  margin: 10px 0;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: none;
  background: none;
  transition: none;
}

.q-item:hover {
  background: rgba(0, 0, 0, 0.1);
}

.light-mode .q-item {
  background: none;
}

.light-mode .q-item:hover {
  background: rgba(0, 0, 0, 0.1);
}

.dark-mode .q-item {
  background: none;
}

.dark-mode .q-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.floating-language-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  width: 60px;
  height: 60px;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-language-selector .q-btn {
  width: 100%;
  height: 100%;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: none;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  padding: 0;
}

.floating-language-selector .q-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}
</style>
