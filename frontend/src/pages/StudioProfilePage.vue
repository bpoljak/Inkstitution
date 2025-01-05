<template>
  <q-page class="studio-profile-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <div class="studio-profile-header" :class="{ 'info-card-dark': $q.dark.isActive, 'info-card-light': !$q.dark.isActive }">
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
        @click="bookAppointment()"
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
          @click="expandImage(image)"
        />
      </div>
      <div v-else class="no-images">
        <p>No images available for this studio.</p>
      </div>
    </div>

    <div v-if="expandedImage" class="image-modal" @click.self="closeModal">
      <div
        class="image-modal-card"
        :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
      >
        <img
          :src="expandedImage.StudioImageLink"
          alt="Expanded Image"
          class="expanded-image"
        />
        <div class="image-modal-footer">
          <p>{{ expandedImage.StudioImageDescription }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const studioId = route.params.studioId;
    const studioData = ref({});
    const studioImages = ref([]);
    const expandedImage = ref(null);

    const fetchStudioDetails = async () => {
      try {
        const studioResponse = await axios.get(
          `${process.env.API_URL}/api/studios/${studioId}`
        );
        console.log("Studio data response:", studioResponse.data);
        studioData.value = studioResponse.data;

        const profileImageResponse = await axios.get(
          `${process.env.API_URL}/api/studioProfileImages/${studioId}`
        );
        console.log("Studio profile image response:", profileImageResponse.data);

        if (profileImageResponse.data && profileImageResponse.data.length > 0) {
          studioData.value.StudioProfileImageLink =
            profileImageResponse.data[0].StudioProfileImageLink;
        } else {
          studioData.value.StudioProfileImageLink = "/path/to/default-profile.png";
        }

        const imagesResponse = await axios.get(
          `${process.env.API_URL}/api/studioImages/studio/${studioId}`
        );
        console.log("Images response:", imagesResponse.data);

        studioImages.value = Array.isArray(imagesResponse.data)
          ? imagesResponse.data
          : [];
      } catch (error) {
        console.error("Error fetching studio details or images:", error);
      }
    };

    const expandImage = (image) => {
      expandedImage.value = image;
    };

    const closeModal = () => {
      expandedImage.value = null;
    };

    const bookAppointment = () => {
      router.push({ name: "AppointmentBookingPage", params: { studioId } });
    };

    onMounted(fetchStudioDetails);

    return {
      studioData,
      studioImages,
      expandedImage,
      expandImage,
      closeModal,
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
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.studio-image:hover {
  transform: scale(1.05);
}

.no-images {
  text-align: center;
  color: var(--q-text-secondary);
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.image-modal-card {
  width: 90vw;
  max-width: 500px;
  background: var(--card-background-color-light);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.content-card-light {
  background-color: white;
  color: black;
}

.content-card-dark {
  background-color: black;
  color: white;
}

.expanded-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.image-modal-footer {
  margin-top: 15px;
  padding: 10px;
  background-color: var(--q-surface);
  width: 100%;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: var(--q-text-primary);
  border-top: 1px solid var(--q-text-secondary);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.info-card-dark {
  background: rgb(24, 24, 24);;
}

.info-card-light {
  background: white;
}
</style>
