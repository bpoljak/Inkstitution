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
      <div class="profile-image-section">
        <img
          size="100px"
          :src="profileImageSrc || defaultProfileImage"
          class="user-profile-image"
        />
      </div>

      <q-form @submit.prevent="onSubmitAll" ref="form">
        <div class="form-content">
          <div>
            <q-btn flat dense label="First Name" @click="toggleField('firstName')" />
            <q-input
              v-if="expandedFields.firstName"
              v-model="form.userFirstName"
              label="First Name"
              hint="Enter your first name"
              outlined
              dense
              :rules="[(val) => !!val || 'Required field']"
            />
            <q-btn
              v-if="expandedFields.firstName"
              flat
              color="gradient-light"
              label="Save"
              @click="onSubmitField('firstName')"
              class="field-save-btn"
            />
          </div>

          <div>
            <q-btn flat dense label="Last Name" @click="toggleField('lastName')" />
            <q-input
              v-if="expandedFields.lastName"
              v-model="form.userLastName"
              label="Last Name"
              hint="Enter your last name"
              outlined
              dense
              :rules="[(val) => !!val || 'Required field']"
            />
            <q-btn
              v-if="expandedFields.lastName"
              flat
              color="gradient-light"
              label="Save"
              @click="onSubmitField('lastName')"
              class="field-save-btn"
            />
          </div>

          <div>
            <q-btn flat dense label="Email" @click="toggleField('email')" />
            <q-input
              v-if="expandedFields.email"
              v-model="form.userEmail"
              label="Email"
              hint="Enter your email"
              outlined
              dense
              type="email"
              :rules="[
                (val) => !!val || 'Required field',
                (val) => /.+@.+\..+/.test(val) || 'Invalid email'
              ]"
            />
            <q-btn
              v-if="expandedFields.email"
              flat
              color="gradient-light"
              label="Save"
              @click="onSubmitField('email')"
              class="field-save-btn"
            />
          </div>

          <div>
            <q-btn flat dense label="Username" @click="toggleField('username')" />
            <q-input
              v-if="expandedFields.username"
              v-model="form.userAccountName"
              label="Username"
              hint="Enter your username"
              outlined
              dense
              :rules="[(val) => !!val || 'Required field']"
            />
            <q-btn
              v-if="expandedFields.username"
              flat
              color="gradient-light"
              label="Save"
              @click="onSubmitField('username')"
              class="field-save-btn"
            />
          </div>

          <div>
            <q-btn flat dense label="New Password" @click="toggleField('newPassword')" />
            <q-input
              v-if="expandedFields.newPassword"
              v-model="form.currentPassword"
              label="Current Password"
              hint="Enter your current password"
              outlined
              dense
              type="password"
              :rules="[
                (val) => !!val || 'Current password is required'
              ]"
            />
            <q-input
              v-if="expandedFields.newPassword"
              v-model="form.newPassword"
              label="New Password"
              hint="Enter a new password (optional)"
              outlined
              dense
              type="password"
              :rules="[
                (val) =>
                  !val ||
                  val.length >= 6 || 'Password must be at least 6 characters long'
              ]"
            />
            <q-input
              v-if="expandedFields.newPassword"
              v-model="form.confirmNewPassword"
              label="Confirm New Password"
              hint="Re-enter your new password"
              outlined
              dense
              type="password"
              :rules="[
                (val) => val === form.newPassword || 'Passwords must match'
              ]"
            />
            <q-btn
              v-if="expandedFields.newPassword"
              flat
              color="gradient-light"
              label="Save"
              @click="onSubmitField('newPassword')"
              class="field-save-btn"
            />
          </div>

          <q-btn
            label="Save All Changes"
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
      userId: null,
      profileImageSrc: "",
      expandedFields: {
        firstName: false,
        lastName: false,
        email: false,
        username: false,
        newPassword: false,
      },
      form: {
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userAccountName: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      defaultProfileImage: "https://via.placeholder.com/100",
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const userResponse = await axios.get(
          `${process.env.API_URL}/api/users/session`,
          { withCredentials: true }
        );
        const userData = userResponse.data;
        console.log(userData);

        this.userId = userData.userId;
        this.form.userFirstName = userData.userFirstName || "";
        this.form.userLastName = userData.userLastName || "";
        this.form.userEmail = userData.userEmail || "";
        this.form.userAccountName = userData.userAccountName || "";

        const imageResponse = await axios.get(
          `${process.env.API_URL}/api/userProfileImages/${this.userId}`
        );
        console.log(imageResponse);
        if (imageResponse.data && imageResponse.data.length > 0) {
          this.profileImageSrc =
            imageResponse.data[0].UserProfileImageLink || this.defaultProfileImage;
        } else {
          this.profileImageSrc = this.defaultProfileImage;
        }

        console.log("Profile Image Src:", this.profileImageSrc);
      } catch (error) {
        console.error("Error fetching user details or profile image:", error);
      }
    },
    toggleField(field) {
      this.expandedFields[field] = !this.expandedFields[field];
    },
    onSubmitField(field) {
      const payload = {
        currentPassword: this.form.currentPassword,
        userFirstName: this.form.userFirstName,
        userLastName: this.form.userLastName,
        userEmail: this.form.userEmail,
        userAccountName: this.form.userAccountName,
        userPassword: this.form.newPassword || undefined,
      };

      axios
        .put(`${process.env.API_URL}/api/users/${this.userId}`, payload, {
          withCredentials: true,
        })
        .then(() => {
          alert(`${field} updated successfully.`);
        })
        .catch((error) => {
          alert(
            error.response?.data?.message ||
              `An error occurred while updating ${field}.`
          );
        });
    },
    onSubmitAll() {
      const payload = {
        userFirstName: this.form.userFirstName,
        userLastName: this.form.userLastName,
        userEmail: this.form.userEmail,
        userAccountName: this.form.userAccountName,
        currentPassword: this.form.currentPassword,
        userPassword: this.form.newPassword || undefined,
      };

      axios
        .put(`${process.env.API_URL}/api/users/${this.userId}`, payload, {
          withCredentials: true,
        })
        .then(() => {
          alert("All changes saved successfully.");
        })
        .catch(() => {
          alert("An error occurred while saving changes.");
        });
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

.user-profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.field-save-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  margin-top: 10px;
}
</style>
