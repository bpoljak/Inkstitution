<template>
  <q-page class="user-profile-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <div class="user-profile-header" :class="{ 'info-card-dark': $q.dark.isActive, 'info-card-light': !$q.dark.isActive }">
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
          :src="image.UserImageLink"
          alt="User Image"
          class="user-image"
          @click="expandImage(image)"
        />
      </div>
      <div v-else class="no-images">
        <p>No images available for this user.</p>
      </div>
    </div>

    <div v-if="expandedImage" class="image-modal" @click.self="closeModal">
      <div
        class="image-modal-card"
        :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
      >
        <img
          :src="expandedImage.UserImageLink"
          alt="Expanded Image"
          class="expanded-image"
        />
        <div class="image-modal-footer">
          <p>{{ expandedImage.UserImageDescription }}</p>
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
    const userId = route.params.userId;
    const userData = ref({});
    const userImages = ref([]);
    const profileImage = ref("");
    const expandedImage = ref(null);

    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get(
          `${process.env.API_URL}/api/users/${userId}`
        );
        console.log("User data response:", userResponse.data);
        userData.value = userResponse.data;

        await fetchProfileImage();

        const imagesResponse = await axios.get(
          `${process.env.API_URL}/api/userimages/user/${userId}`
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

    const expandImage = (image) => {
      expandedImage.value = image;
    };

    const closeModal = () => {
      expandedImage.value = null;
    };

    onMounted(fetchUserProfile);

    return {
      userData,
      userImages,
      profileImage,
      expandedImage,
      expandImage,
      closeModal,
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
  overflow: hidden;
}

.user-profile-header h2 {
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-content: center;
}

.user-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.user-image:hover {
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
  background: rgb(24, 24, 24);
}

.info-card-light {
  background: white;
}

@media screen and (max-width: 768px) {
  .user-profile-page {
    padding: 10px;
  }

  .user-profile-header {
    padding: 20px;
    max-width: 90%;
  }

  .user-profile-header h2 {
    font-size: 1.5rem;
  }

  .user-profile-image {
    width: 80px;
    height: 80px;
  }

  .divider {
    margin: 15px 0;
  }

  .images-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .user-image {
    height: 100px;
  }

  .image-modal-card {
    max-width: 90%;
  }

  .expanded-image {
    height: 250px;
  }
}
</style>