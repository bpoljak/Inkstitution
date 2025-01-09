<template>
  <q-page
    class="settings-page"
    :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }"
  >
    <q-card
      class="settings-card"
      :class="{
        'card-dark': $q.dark.isActive,
        'card-light': !$q.dark.isActive,
      }"
    >
      <q-form @submit="onSubmit" ref="form">
        <div class="form-content">
          <div class="profile-image-section">
            <q-avatar
              size="100px"
              :src="form.userProfileImage || defaultProfileImage"
              class="profile-avatar"
            />
            <q-btn
              flat
              color="gradient-light"
              label="Change Profile Image"
              @click="changeProfileImage"
              class="profile-image-btn"
            />
          </div>
          <q-input
            v-model="form.userFirstName"
            label="First Name"
            hint="Enter your first name"
            outlined
            dense
            :rules="[(val) => !!val || 'Required field']"
          />
          <q-input
            v-model="form.userLastName"
            label="Last Name"
            hint="Enter your last name"
            outlined
            dense
            :rules="[(val) => !!val || 'Required field']"
          />
          <q-input
            v-model="form.userEmail"
            label="Email"
            hint="Enter your email"
            outlined
            dense
            type="email"
            :rules="[
              (val) => !!val || 'Required field',
              (val) => /.+@.+\..+/.test(val) || 'Invalid email',
            ]"
          />
          <q-input
            v-model="form.userAccountName"
            label="Username"
            hint="Enter your username"
            outlined
            dense
            :rules="[(val) => !!val || 'Required field']"
          />
          <q-input
            v-model="form.newPassword"
            label="New Password"
            hint="Enter a new password (optional)"
            outlined
            dense
            type="password"
            :rules="[
              (val) =>
                !val ||
                val.length >= 6 ||
                'Password must be at least 6 characters long',
            ]"
          />
          <q-input
            v-model="form.confirmNewPassword"
            label="Confirm New Password"
            hint="Re-enter your new password"
            outlined
            dense
            type="password"
            :rules="[
              (val) => val === form.newPassword || 'Passwords must match',
            ]"
          />
          <q-btn
            label="Save Changes"
            type="submit"
            color="gradient-light"
            class="save-button"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        userProfileImage: "", 
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userAccountName: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      defaultProfileImage: "https://via.placeholder.com/100",
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/users/session`, { withCredentials: true });
        const userData = response.data;

        this.form.userFirstName = userData.userFirstName || "";
        this.form.userLastName = userData.userLastName || "";
        this.form.userEmail = userData.userEmail || "";
        this.form.userAccountName = userData.userAccountName || "";
      } catch (error) {
        console.error("Error fetching user details from session:", error);
        alert("Error fetching user details. Please log in again.");
      }
    },
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          const payload = {
            userProfileImage: this.form.userProfileImage,
            userFirstName: this.form.userFirstName,
            userLastName: this.form.userLastName,
            userEmail: this.form.userEmail,
            userAccountName: this.form.userAccountName,
          };

          if (this.form.newPassword) {
            payload.newPassword = this.form.newPassword;
          }

          axios
            .put(`${process.env.API_URL}/api/users/update-profile`, payload, { withCredentials: true })
            .then(() => {
              alert("Your profile has been updated successfully.");
            })
            .catch(() => {
              alert("An error occurred while updating your profile.");
            });
        }
      });
    },
    changeProfileImage() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.form.userProfileImage = reader.result;
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
  },
  mounted() {
    this.fetchUserProfile(); 
  },
};
</script>




<style scoped>
.settings-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  padding: 0;
}

.settings-card {
  background: var(--card-background-color);
  padding: 16px;
  border-radius: 12px;
  max-width: 320px;
  width: 90%;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.profile-avatar {
  margin-bottom: 8px;
}

.profile-image-btn {
  font-size: 0.85rem;
  text-decoration: underline;
  cursor: pointer;
}

.save-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 8px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.card-dark {
  background: rgb(24, 24, 24);
}

.card-light {
  background: white;
}
</style>
