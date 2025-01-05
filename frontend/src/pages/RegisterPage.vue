<template>
  <q-page class="register-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <q-card class="register-card" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
      <q-form @submit="onSubmit" ref="form">
        <div class="form-content">
          <q-input
            v-model="form.userFirstName"
            :label="$t('registration.firstName')"
            :hint="$t('registration.firstNameHint')"
            outlined
            dense
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userLastName"
            :label="$t('registration.lastName')"
            :hint="$t('registration.lastNameHint')"
            outlined
            dense
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userAccountName"
            :label="$t('registration.username')"
            :hint="$t('registration.usernameHint')"
            outlined
            dense
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userEmail"
            :label="$t('registration.email')"
            :hint="$t('registration.emailHint')"
            outlined
            dense
            type="email"
            :rules="[val => !!val || $t('registration.validation.required'), val => /.+@.+\..+/.test(val) || $t('registration.validation.email')]"
          />
          <q-input
            v-model="form.userPassword"
            :label="$t('registration.password')"
            :hint="$t('registration.passwordHint')"
            outlined
            dense
            type="password"
            :rules="[val => !!val || $t('registration.validation.required'), val => val.length >= 6 || $t('registration.validation.minLength')]"
          />
          <q-input
            v-model="form.confirmPassword"
            :label="$t('registration.confirmPassword')"
            :hint="$t('registration.confirmPasswordHint')"
            outlined
            dense
            type="password"
            :rules="[val => val === form.userPassword || $t('registration.validation.matchPassword')]"
          />
          <q-checkbox
            v-model="form.terms"
            :label="$t('registration.termsLabel')"
            dense
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-btn :label="$t('registration.submitButton')" type="submit" color="gradient-light" class="register-button" />
          <q-btn
            flat
            color="gradient-light"
            class="studio-link"
            @click="navigateToStudio"
          >
            {{ $t('registration.studioLink') }}
          </q-btn>
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
        userFirstName: "",
        userLastName: "",
        userAccountName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        terms: false,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          axios
            .post(`${process.env.API_URL}/api/users`, {
              userFirstName: this.form.userFirstName,
              userLastName: this.form.userLastName,
              userAccountName: this.form.userAccountName,
              userEmail: this.form.userEmail,
              userPassword: this.form.userPassword,
            })
            .then(() => {
              alert(this.$t("registration.successMessage"));
              this.$router.push("/login");
            })
            .catch(() => {
              alert(this.$t("registration.errorMessage"));
            });
        }
      });
    },
    navigateToStudio() {
      this.$router.push("/studio-register");
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  padding: 0;
}

.register-card {
  background: var(--card-background-color);
  padding: 16px;
  border-radius: 12px;
  max-width: 320px;
  width: 90%;
  height: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.q-input,
.q-checkbox {
  font-size: 0.85rem;
}

.register-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 8px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.studio-link {
  text-align: center;
  margin-top: 12px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  color: #ff7e5f;
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}
</style>
