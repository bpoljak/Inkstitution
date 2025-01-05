<template>
  <q-page :class="{ 'dark-mode': $q.dark.isActive }" class="studios-page">
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
        :class="{
          'studio-card-dark': $q.dark.isActive,
          'studio-card-light': !$q.dark.isActive,
        }"
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
        const studiosResponse = await axios.get(
          `${process.env.API_URL}/api/studios`
        );
        const studiosList = studiosResponse.data;

        const studiosWithImages = await Promise.all(
          studiosList.map(async (studio) => {
            try {
              const imageResponse = await axios.get(
                `${process.env.API_URL}/api/studioProfileImages/${studio.StudioID}`
              );
              const image =
                imageResponse.data.length > 0 ? imageResponse.data[0] : null;
              return {
                ...studio,
                imageLink: image ? image.StudioProfileImageLink : null,
              };
            } catch (error) {
              console.error(
                `Error fetching image for studio ${studio.StudioID}`,
                error
              );
              return { ...studio, imageLink: null };
            }
          })
        );

        studios.value = studiosWithImages;
      } catch (error) {
        console.error("Error fetching studios:", error);
      }
    };

    const filteredStudios = computed(() => {
      if (!searchQuery.value) {
        return studios.value;
      }
      const query = searchQuery.value.toLowerCase().trim();
      return studios.value.filter((studio) => {
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

.dark-mode {
  background-color: var(--page-background-color-dark);
  color: white;
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

.studio-card-light {
  background-color: var(--card-background-color-light);
  color: var(--text-color-light);
  border: 1px solid var(--border-color-light);
}

.studio-card-dark {
  background-color: var(--card-background-color-dark);
  color: var(--text-color-dark);
  border: 1px solid var(--border-color-dark);
}

.studio-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.studio-card:hover {
  transform: translateY(-5px);
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
  color: var(--text-secondary);
}
</style>
