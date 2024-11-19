<template>
  <q-form @submit.prevent="sendEmail">
    <q-input v-model="form.email" label="Vaš Email" type="email" readonly />
    <q-input v-model="form.subject" label="Naslov" type="text" required />
    <q-input v-model="form.message" label="Poruka" type="textarea" required />
    <q-btn label="Pošalji poruku" type="submit" color="primary" />
  </q-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  mounted() {
  axios
    .get("http://localhost:3000/api/emails/current-user-email", { withCredentials: true })
    .then((response) => {
      this.form.email = response.data.email;
    })
    .catch((error) => {
      console.error("Greška prilikom dohvaćanja emaila:", error);
      this.$q.notify({ type: "negative", message: "Greška prilikom dohvaćanja emaila." });
    });
},

  methods: {
    async sendEmail() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/emails/send",
          {
            email: this.form.email,
            subject: this.form.subject,
            message: this.form.message,
          },
          { withCredentials: true }
        );
        this.$q.notify({ type: "positive", message: response.data.message });
        this.form.subject = "";
        this.form.message = "";
      } catch (error) {
        this.$q.notify({ type: "negative", message: "Greška prilikom slanja poruke." });
      }
    },
  },
};
</script>
