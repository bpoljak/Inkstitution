<template>
  <q-page padding>
    <h1>Kontakt</h1>
    <p>Molimo vas da ispunite formu kako bismo vas mogli kontaktirati.</p>

    <q-form @submit.prevent="openDialog">
      <q-input
        filled
        v-model="form.email"
        label="Email"
        type="email"
        :rules="[(val) => !!val || 'Email je obavezan']"
        required
      />

      <q-input
        filled
        v-model="form.message"
        label="Poruka"
        type="textarea"
        :rules="[(val) => !!val || 'Poruka je obavezna']"
        required
        autogrow
      />

      <q-btn label="Pošalji" type="submit" color="primary" class="q-mt-md" />
    </q-form>

    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Potvrda slanja</div>
          <div>Želite li stvarno poslati poruku?</div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            label="Otkaži"
            color="negative"
            @click="dialogVisible = false"
          />
          <q-btn label="Pošalji" color="positive" @click="handleSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div ref="map" id="map" style="height: 500px; width: 100%;"></div>
  </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useQuasar } from "quasar";
import emailjs from "emailjs-com";

export default {
  setup() {
    const form = ref({
      email: "",
      message: "",
      image: "",
    });

    const dialogVisible = ref(false);
    const $q = useQuasar();

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.34023, lng: 14.41410 },
        zoom: 14,
      });

      new google.maps.Marker({
        position: { lat: 45.34023, lng: 14.41410 },
        map: map,
        title: "Inkstitution",
      });
    };

    onMounted(() => {
      console.log("Google Maps API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        console.log("Google maps loaded");
        initMap();
      };
      document.body.appendChild(script);
    });

    const openDialog = () => {
      dialogVisible.value = true;
    };

    const handleSubmit = async () => {
      dialogVisible.value = false;
      const { email, message, image } = form.value;

      if (!email || !message) {
        $q.notify({
          type: "negative",
          message: "Molimo ispunite sve potrebne podatke.",
        });
        return;
      }

      console.log("EmailJS Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log("EmailJS Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log("EmailJS User ID:", import.meta.env.VITE_EMAILJS_USER_ID);

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { email, message, image },
          import.meta.env.VITE_EMAILJS_USER_ID
        );
        $q.notify({ type: "positive", message: "Poruka je uspješno poslana!" });

        form.value.email = "";
        form.value.message = "";
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Greška prilikom slanja poruke. Pokušajte ponovo.",
        });
      } finally {
        dialogVisible.value = false;
      }
    };

    return {
      form,
      dialogVisible,
      openDialog,
      handleSubmit,
    };
  }
};
</script>
