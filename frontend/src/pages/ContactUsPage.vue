<template>
  <q-page :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }" padding>
    <q-card class="form-card" :class="{ 'form-card-dark': $q.dark.isActive, 'form-card-light': !$q.dark.isActive }">
      <q-card-section>
        <h1>{{ $t('contactUs.title') }}</h1>
        <p>{{ $t('contactUs.description') }}</p>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="openDialog">
          <q-input
            filled
            v-model="form.email"
            :label="$t('contactUs.emailLabel')"
            type="email"
            :rules="[(val) => !!val || $t('contactUs.emailRequired')]"
            :readonly="isLoggedIn"
            required
          />

          <q-input
            filled
            v-model="form.message"
            :label="$t('contactUs.messageLabel')"
            type="textarea"
            :rules="[(val) => !!val || $t('contactUs.messageRequired')]"
            required
            autogrow
          />

          <q-btn :label="$t('contactUs.submitButton')" type="submit" color="primary" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="map-card">
      <q-card-section>
        <center><h2>{{ $t('contactUs.findUs') }}</h2></center>
      </q-card-section>

      <q-card-section>
        <div ref="map" id="map" class="map"></div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('contactUs.confirmationTitle') }}</div>
          <div>{{ $t('contactUs.confirmationText') }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            :label="$t('contactUs.cancelButton')"
            color="negative"
            @click="dialogVisible = false"
          />
          <q-btn :label="$t('contactUs.confirmButton')" color="positive" @click="handleSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const form = ref({
      email: "",
      message: "",
    });

    const dialogVisible = ref(false);
    const isLoggedIn = ref(false);

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.34023, lng: 14.4141 },
        zoom: 14,
      });

      new google.maps.Marker({
        position: { lat: 45.34023, lng: 14.4141 },
        map: map,
        title: "Inkstitution",
      });
    };

    onMounted(() => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);

      axios
        .get(`${process.env.API_URL}/api/users/session`, { withCredentials: true })
        .then((response) => {
          form.value.email = response.data.userEmail;
          isLoggedIn.value = true;
        })
        .catch(() => {
          isLoggedIn.value = false;
        });
    });

    const openDialog = () => {
      dialogVisible.value = true;
    };

    const handleSubmit = async () => {
      dialogVisible.value = false;
      const { email, message } = form.value;

      if (!email || !message) {
        $q.notify({
          type: "negative",
          message: t('contactUs.errorMessage'),
        });
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.API_URL}/api/emails/send`,
          { email, subject: t('contactUs.emailSubject'), message },
          { withCredentials: true }
        );

        $q.notify({ type: "positive", message: response.data.message });
        form.value.message = "";
      } catch (error) {
        $q.notify({
          type: "negative",
          message: t('contactUs.errorMessage'),
        });
      }
    };

    return {
      form,
      dialogVisible,
      isLoggedIn,
      openDialog,
      handleSubmit,
      t,
    };
  },
};
</script>


<style scoped>
.form-card,
.map-card {
  background-color: var(--card-background-color);
  color: var(--text-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.map {
  height: 500px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
}

body[data-theme="dark"] .form-card,
body[data-theme="dark"] .map-card {
  background-color: var(--card-background-color-dark);
}

body[data-theme="light"] .form-card,
body[data-theme="light"] .map-card {
  background-color: var(--card-background-color-light);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.form-card-dark {
  background: rgb(24, 24, 24);
}

.form-card-light {
  background: white;
}

@media screen and (max-width: 768px) {
  .form-card,
  .map-card {
    padding: 15px;
    margin-bottom: 15px;
  }

  .map {
    height: 300px;
    border: 1px solid #ccc;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  .q-btn {
    font-size: 14px;
    padding: 10px 15px;
  }
}
</style>

