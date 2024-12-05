<template>
  <q-page class="studios-page">
    <div class="studios-container">
      <q-card v-for="studio in studios" :key="studio.StudioID" class="studio-card">
        <div class="studio-logo">
          <img src="/path/to/logo.png" alt="Studio Logo" />
        </div>
        <div class="studio-details">
          <h2>{{ studio.StudioName }}</h2>
          <p>{{ studio.StudioAddress }}</p>
          <p>{{ studio.StudioEmail }}</p>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studios: [],
    };
  },
  methods: {
    fetchStudios() {
      axios
        .get(`${process.env.API_URL}/api/studios`)
        .then((response) => {
          this.studios = response.data;
        })
        .catch((error) => {
          console.error("Error fetching studios:", error);
        });
    },
  },
  mounted() {
    this.fetchStudios();
  },
};
</script>

<style scoped>
.studios-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--q-page);
}

.studios-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 900px;
}

.studio-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: var(--q-surface);
  color: var(--q-text-primary);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--q-text-secondary);
  width: 100%;
}

.studio-logo img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.studio-details h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.studio-details p {
  margin: 5px 0;
  font-size: 14px;
  color: var(--q-text-secondary);
}
</style>
