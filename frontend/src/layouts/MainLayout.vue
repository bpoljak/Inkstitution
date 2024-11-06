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
import { ref } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const linksList = [
  {
    title: t('home'),
    caption: t('homeCaption'),
    icon: 'home',
    link: '/'
  },
  {
    title: t('register'),
    caption: t('registerCaption'),
    icon: 'code',
    link: '/register'
  },
  {
    title: t('login'),
    caption: t('loginCaption'),
    icon: 'login',
    link: '/login'
  },
  {
    title: t('studios'),
    caption: t('studiosCaption'),
    icon: 'store',
    link: '/studios'
  },
  {
    title: t('appointments'),
    caption: t('appointmentsCaption'),
    icon: 'book',
    link: '/appointments'
  },
  {
    title: t('aftercare'),
    caption: t('aftercareCaption'),
    icon: 'medication',
    link: '/aftercare'
  },
  {
    title: t('about'),
    caption: t('aboutCaption'),
    icon: 'info',
    link: '/about'
  },
  {
    title: t('settings'),
    caption: t('settingsCaption'),
    icon: 'settings',
    link: '/settings'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>