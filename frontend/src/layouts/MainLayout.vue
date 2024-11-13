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
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
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
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const linksList = computed(() => [
  {
    title: t('essentialLinks.home'),
    caption: t('essentialLinks.homeCaption'),
    icon: 'home',
    link: '/'
  },
  {
    title: t('essentialLinks.register'),
    caption: t('essentialLinks.registerCaption'),
    icon: 'code',
    link: '/register'
  },
  {
    title: t('essentialLinks.login'),
    caption: t('essentialLinks.loginCaption'),
    icon: 'login',
    link: '/login'
  },
  {
    title: t('essentialLinks.studios'),
    caption: t('essentialLinks.studiosCaption'),
    icon: 'store',
    link: '/studios'
  },
  {
    title: t('essentialLinks.appointments'),
    caption: t('essentialLinks.appointmentsCaption'),
    icon: 'book',
    link: '/appointments'
  },
  {
    title: t('essentialLinks.aftercare'),
    caption: t('essentialLinks.aftercareCaption'),
    icon: 'medication',
    link: '/aftercare'
  },
  {
    title: t('essentialLinks.about'),
    caption: t('essentialLinks.aboutCaption'),
    icon: 'info',
    link: '/about'
  },
  {
    title: t('essentialLinks.contactUs'),
    caption: t('essentialLinks.contactUsCaption'),
    icon: 'message',
    link: '/contactUs'
  },
  {
    title: t('essentialLinks.settings'),
    caption: t('essentialLinks.settingsCaption'),
    icon: 'settings',
    link: '/settings'
  },
]);

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
