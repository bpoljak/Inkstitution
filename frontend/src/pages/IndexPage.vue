<template>
  <q-page>
    <div :class="['full-screen-section', $q.dark.isActive ? 'dark-mode' : 'light-mode']">
      <div class="q-pa-md text-center hero-section">
        <h1 :class="$q.dark.isActive ? 'text-white' : 'text-black'">
          Choose your <span class="text-gradient">artist</span>
        </h1>
        <p :class="$q.dark.isActive ? 'text-gray' : 'text-dark-purple'">Fast and simple</p>
        <q-btn class="custom-button q-my-md" label="Explore" />
      </div>
    </div>

    <div class="card-container flex-cards q-my-lg q-gutter-lg">
      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="layers" size="50px" class="icon-style" />
          <h2 class="text-gradient">WHAT IS OUR MISSION?</h2>
          <div class="text-container">
            <p class="text">We connect clients with tattoo artists</p>
            <p class="text">Book an appointment with one click</p>
          </div>
          <q-btn class="custom-button q-my-md" label="Find out more" />
        </q-card-section>
      </q-card>

      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="groups" size="50px" class="icon-style" />
          <h2 class="text-gradient">CREATE YOUR FREE ACCOUNT</h2>
          <div class="text-container">
            <p class="text">Sign Up Today</p>
            <p class="text">Find the right artist</p>
          </div>
          <q-btn class="custom-button q-my-md" label="Sign Up"/>
        </q-card-section>
      </q-card>

      <q-card :class="['q-pa-md', 'content-card', $q.dark.isActive ? 'dark-card' : 'light-card']">
        <q-card-section class="text-center card-content">
          <q-icon name="store" size="50px" class="icon-style" />
          <h2 class="text-gradient">DO YOU OWN A STUDIO?</h2>
          <div class="text-container">
            <p class="text">Register your studio and start booking clients</p>
            <p class="text">Find tattoo artists and expand your community</p>
          </div>
          <q-btn class="custom-button q-my-md" label="Register studio"/>
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
