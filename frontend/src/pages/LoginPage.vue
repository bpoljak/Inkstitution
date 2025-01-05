<template>
  <q-page
    class="q-pa-md login-page"
    :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }"
  >
    <q-card
      class="login-card"
      :class="{ 'card-dark': $q.dark.isActive, 'card-light': !$q.dark.isActive }"
    >
      <q-form @submit="onSubmit" ref="form">
        <div class="q-gutter-md">
          <q-input
            v-model="form.userEmail"
            :label="$t('login.email')"
            :hint="$t('login.emailHint')"
            outlined
            dense
            :rules="[val => !!val || $t('login.validation.required')]"
          />
          <q-input
            v-model="form.userPassword"
            :label="$t('login.password')"
            :hint="$t('login.passwordHint')"
            outlined
            dense
            type="password"
            :rules="[val => !!val || $t('login.validation.required')]"
          />
          <q-btn
            :label="$t('login.submitButton')"
            type="submit"
            color="gradient-light"
            class="login-button"
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
        userEmail: "",
        userPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          axios
            .post(
              `${process.env.API_URL}/api/users/login`,
              {
                userEmail: this.form.userEmail,
                userPassword: this.form.userPassword,
              },
              { withCredentials: true }
            )
            .then((response) => {
              this.userName = response.data.userName;
              this.$router.push("/");
            })
            .catch(() => {
              alert(this.$t("login.errorMessage"));
            });
        }
      });
    },
    onReset() {
      this.form.userEmail = "";
      this.form.userPassword = "";
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.login-card {
  background: var(--card-background-color);
  padding: 20px;
  border-radius: 12px;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.q-input {
  font-size: 0.9rem;
}

.login-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: calc(100% - 25px);
  display: block;
  margin: 10px 20px 10px 20px;
}


.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.card-dark {
  background: rgb(24, 24, 24);;
}

.card-light {
  background: white;
}
</style>
