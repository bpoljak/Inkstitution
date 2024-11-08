<template>
  <div :data-theme="$q.dark.isActive ? 'dark' : 'light'">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

watch(
  () => $q.dark.isActive,
  () => {
    document.documentElement.setAttribute('data-theme', $q.dark.isActive ? 'dark' : 'light');
  }
);
</script>

<style>
:root {
  --page-background-color-light: #ffffff;
  --card-background-color-light: #f9f9f9;
  --button-background-color-light: #ff8c42;
  --button-text-color-light: #ffffff;
  --link-color-light: #ff8c42;

  --page-background-color-dark: #121212;
  --card-background-color-dark: #1e1e1e;
  --button-background-color-dark: #ff8c42;
  --button-text-color-dark: #ffffff;
  --link-color-dark: #ff8c42;
}

[data-theme="light"] {
  --page-background-color: var(--page-background-color-light);
  --card-background-color: var(--card-background-color-light);
  --button-background-color: var(--button-background-color-light);
  --button-text-color: var(--button-text-color-light);
  --link-color: var(--link-color-light);
}

[data-theme="dark"] {
  --page-background-color: var(--page-background-color-dark);
  --card-background-color: var(--card-background-color-dark);
  --button-background-color: var(--button-background-color-dark);
  --button-text-color: var(--button-text-color-dark);
  --link-color: var(--link-color-dark);
}

body {
  background-color: var(--page-background-color);
}
</style>
