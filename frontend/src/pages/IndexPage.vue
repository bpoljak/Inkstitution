<template>
  <q-page class="flex flex-center">
    <img
      alt="Inkstitution Logo"
      src="~assets/logo1.png"
      style="width: 275px; height: 200px"
    >
    <div>
      <h1>{{ $t("name") }}</h1>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'IndexPage'
});
</script>
