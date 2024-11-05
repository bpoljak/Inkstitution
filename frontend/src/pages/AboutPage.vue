<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1>{{ t("about") }}</h1>
      <p>{{ t("description") }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
