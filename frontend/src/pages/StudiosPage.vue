<template>
  <q-page class="studios-page">
    <div class="studios-container">
      <q-input
        filled
        v-model="searchQuery"
        :label="$t('studiosPage.searchBar.label')"
        debounce="300"
        class="search-bar"
        :placeholder="$t('studiosPage.searchBar.placeholder')"
      />
      <q-card
      v-for="studio in filteredStudios"
      :key="studio.StudioID"
      class="studio-card"
      @click="goToStudioProfile(studio.StudioID)"
      >

        <div class="studio-logo">
          <img
            :src="studio.imageLink || '/path/to/default-logo.png'"
            alt="Studio Logo"
          />
        </div>
        <div class="studio-details">
          <h2>{{ studio.StudioName }}</h2>
          <p>{{ studio.StudioCity }}</p>
          <p>{{ studio.StudioAddress }}</p>
          <p>{{ studio.StudioPhone }}</p>
          <p>{{ studio.StudioEmail }}</p>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const studios = ref([]);
    const searchQuery = ref("");
    const router = useRouter();

    const fetchStudios = async () => {
      try {
        const [studiosResponse, imagesResponse] = await Promise.all([
          axios.get(`${process.env.API_URL}/api/studios`),
          axios.get(`${process.env.API_URL}/api/studioimages`),
        ]);

        const images = imagesResponse.data;

        studios.value = studiosResponse.data.map((studio) => {
          const image = images.find(
            (img) => img.StudioID === studio.StudioID
          );
          return {
            ...studio,
            imageLink: image ? image.StudioProfileImageLink : null,
          };
        });
      } catch (error) {
        console.error("Error fetching studios or images:", error);
      }
    };

    const filteredStudios = computed(() => {
      if (!searchQuery.value) {
        return studios.value;
      }
      return studios.value.filter((studio) => {
        const query = searchQuery.value.toLowerCase();
        return (
          studio.StudioName.toLowerCase().includes(query) ||
          studio.StudioCity.toLowerCase().includes(query)
        );
      });
    });

    const goToStudioProfile = (studioId) => {
  router.push({ path: `/studioProfile/${studioId}` });
};


    fetchStudios();

    return {
      studios,
      searchQuery,
      filteredStudios,
      goToStudioProfile,
    };
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

.search-bar {
  margin-bottom: 20px;
  width: 100%;
  max-width: 900px;
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
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.studio-card:hover {
  transform: translateY(-5px);
}

</style>
