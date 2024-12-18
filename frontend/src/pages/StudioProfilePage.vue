<template>
  <q-page class="studio-profile-page">
    <div class="studio-profile-header">
      <img
        :src="studioData.StudioProfileImageLink || '/path/to/default-profile.png'"
        alt="Studio Profile"
        class="studio-profile-image"
      />
      <h2>{{ studioData.StudioName || "Studio Name" }}</h2>
      <p>{{ studioData.StudioAddress || "Studio Address" }}</p>
      <p>{{ studioData.StudioPhone || "Studio Phone Number" }}</p>
      <q-btn
        color="orange"
        label="Book an appointment"
        @click="bookAppointment"
        class="book-button"
      />
    </div>

    <hr class="divider" />

    <div class="studio-images-section">
      <div v-if="studioImages.length" class="images-grid">
        <img
          v-for="(image, index) in studioImages"
          :key="index"
          :src="image.StudioImageLink"
          alt="Studio Image"
          class="studio-image"
        />
      </div>
      <div v-else class="no-images">
        <p>No images available for this studio.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const studioId = route.params.studioId;
    const studioData = ref({});
    const studioImages = ref([]);

    const fetchStudioDetails = async () => {
  try {
    const studioResponse = await axios.get(
      `${process.env.API_URL}/api/studios/${studioId}`
    );
    console.log("Studio data response:", studioResponse.data);
    studioData.value = studioResponse.data;

    const imagesResponse = await axios.get(
      `${process.env.API_URL}/api/studioimages/${studioId}`
    );
    console.log("Images response:", imagesResponse.data);


    if (Array.isArray(imagesResponse.data)) {
      studioImages.value = imagesResponse.data;
    } else if (imagesResponse.data) {
      studioImages.value = [imagesResponse.data];
    } else {
      studioImages.value = [];
    }

    console.log("studioImages state:", studioImages.value);
  } catch (error) {
    console.error("Error fetching studio details or images:", error);
  }
};


    const bookAppointment = () => {
      console.log("Redirect to booking appointment page...");
    };

    onMounted(fetchStudioDetails);

    return {
      studioData,
      studioImages,
      bookAppointment,
    };
  },
};
</script>

<style scoped>
.studio-profile-page {
  padding: 20px;
  background-color: var(--q-page);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.studio-profile-header {
  text-align: center;
  background-color: var(--q-surface);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  margin-bottom: 20px;
}

.studio-profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.book-button {
  margin-top: 10px;
}

.divider {
  width: 100%;
  border: none;
  border-top: 1px solid var(--q-text-secondary);
  margin: 20px 0;
}

.studio-images-section {
  width: 100%;
  max-width: 900px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.studio-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-images {
  text-align: center;
  color: var(--q-text-secondary);
}
</style>
