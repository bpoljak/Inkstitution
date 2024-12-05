<template>
  <q-page class="q-pa-md">
    <h1>Postavke</h1>
    <q-card-section class="q-pt-none">

      <q-select
        v-model="locale"
        :options="languages"
        dense
        emit-value
        map-options
        options-dense
        @update:model-value="changeLanguage"
        :label="$t('language')"
      />
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

const $q = useQuasar();
const { locale } = useI18n({ useScope: "global" });

const currentLang = ref("hr");

const languages = [
  { value: "en", label: "English" },
  { value: "hr", label: "Hrvatski" },
];

const changeLanguage = (value) => {
  $q.lang.set(value);
  currentLang.value = value;
  $q.localStorage.set("language", value);
};
</script>

<style scoped>
h1 {
  color: #1976d2;
}
</style>
