<template>
  <q-page>
    <div :class="['full-screen-section', $q.dark.isActive ? 'dark-mode' : 'light-mode']">
      <div class="q-pa-md text-center hero-section">
        <h1 :class="$q.dark.isActive ? 'text-white' : 'text-black'">
          {{ $t('indexPage.chooseYour') }}
          <span class="text-orange">{{ $t('indexPage.artist') }}</span>
        </h1>
        <p :class="$q.dark.isActive ? 'text-gray' : 'text-dark-purple'">{{ $t('indexPage.fastAndSimple') }}</p>
        <q-btn class="custom-button q-my-md" :label="$t('indexPage.explore')" />
      </div>
    </div>

    <div class="card-container flex-cards q-my-lg q-gutter-lg">
      <!-- Druga sekcija kartica -->
      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="layers" size="50px" class="icon-style" />
          <h2 class="text-gradient">{{ $t('indexPage.missionTitle') }}</h2>
          <div class="text-container">
            <p class="text">{{ $t('indexPage.missionDescription1') }}</p>
            <p class="text">{{ $t('indexPage.missionDescription2') }}</p>
          </div>
          <q-btn class="custom-button q-my-md" :label="$t('indexPage.missionButton')" />
        </q-card-section>
      </q-card>

      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="groups" size="50px" class="icon-style" />
          <h2 class="text-gradient">{{ $t('indexPage.createAccountTitle') }}</h2>
          <div class="text-container">
            <p class="text">{{ $t('indexPage.createAccountDescription1') }}</p>
            <p class="text">{{ $t('indexPage.createAccountDescription2') }}</p>
          </div>
          <q-btn class="custom-button q-my-md" :label="$t('indexPage.createAccountButton')" />
        </q-card-section>
      </q-card>

      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="store" size="50px" class="icon-style" />
          <h2 class="text-gradient">{{ $t('indexPage.ownStudioTitle') }}</h2>
          <div class="text-container">
            <p class="text">{{ $t('indexPage.ownStudioDescription') }}</p>
          </div>
          <q-btn class="custom-button q-my-md" :label="$t('indexPage.ownStudioButton')" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
const $q = useQuasar();
</script>

<style scoped>

.full-screen-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.light-mode {
  background-color: #f1f1f1;
}

.dark-mode {
  background-color: #1e1e1e;
}

.hero-section {
  text-align: center;
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

.text-gray {
  color: #b0b0b0;
}

.text-orange {
  color: #ff7e5f;
}

.text-gradient {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-dark-purple {
  color: #5a2d7b;
}

.custom-button {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: white;
}

.content-card {
  border-radius: 10px;
  max-width: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 450px;
  transition: background-color 0.3s ease;
}

.light-card {
  background-color: #f1f1f1;
}

.dark-card {
  background-color: #333;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-height: 80px;
}

.align-button {
  align-self: center;
}

.icon-style {
  margin-bottom: 20px;
}

.flex-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.q-my-lg {
  margin-top: 40px;
  margin-bottom: 40px;
}

.q-gutter-lg {
  gap: 30px;
}
</style>
