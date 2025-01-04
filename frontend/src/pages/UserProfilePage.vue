<template>
  <q-page class="user-profile-page">
    <div class="user-profile-header">
      <img :src="profileImage" alt="User Profile" class="user-profile-image" />
      <h2>{{ userData.UserAccountName || "User Name" }}</h2>
      <p>
        {{ userData.UserFirstName || "User First Name and Last Name" }}
        {{ userData.UserLastName || "User Last Name" }}
      </p>
      <p>{{ userData.UserEmail || "User Email" }}</p>
    </div>

    <hr class="divider" />

    <div class="user-images-section">
      <div v-if="userImages.length" class="images-grid">
        <img
          v-for="(image, index) in userImages"
          :key="index"
          :src="image.userImageLink"
          alt="User Image"
          class="user-image"
        />
      </div>
      <div v-else class="no-images">
        <p>No images available for this user.</p>
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
    const userId = route.params.userId;
    const userData = ref({});
    const userImages = ref([]);
    const profileImage = ref("");

    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(
          `${process.env.API_URL}/api/users/${userId}`
        );
        console.log("User data response:", userResponse.data);
        userData.value = userResponse.data;

        await fetchProfileImage();

        const imagesResponse = await axios.get(
          `${process.env.API_URL}/api/userimages/${userId}`
        );
        console.log("User images response:", imagesResponse.data);

        if (Array.isArray(imagesResponse.data)) {
          userImages.value = imagesResponse.data;
        } else {
          userImages.value = [];
        }
      } catch (error) {
        console.error("Error fetching user details or images:", error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const profileResponse = await axios.get(
          `${process.env.API_URL}/api/userProfileImages/${userId}`
        );
        console.log("Profile image response:", profileResponse.data);

        if (
          Array.isArray(profileResponse.data) &&
          profileResponse.data.length
        ) {
          profileImage.value = profileResponse.data[0].UserProfileImageLink;
        } else {
          profileImage.value = "/path/to/default-profile.png";
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        profileImage.value = "/path/to/default-profile.png";
      }
    };

    const bookAppointment = () => {
      router.push({ name: "AppointmentBookingPage", params: { userId } });
    };

    onMounted(fetchUserProfile);

    return {
      userData,
      userImages,
      profileImage,
      bookAppointment,
    };
  },
};
</script>

<style scoped>
.user-profile-page {
  padding: 20px;
  background-color: var(--q-page);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-profile-header {
  text-align: center;
  background-color: var(--q-surface);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  margin-bottom: 20px;
}

.user-profile-image {
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

.user-images-section {
  width: 100%;
  max-width: 900px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.user-image {
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
