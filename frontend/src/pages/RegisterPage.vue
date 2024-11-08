<template>
  <q-page class="q-pa-md register-page">
    <q-card class="register-card">
      <q-form @submit="onSubmit" ref="form">
        <div class="q-gutter-md">
          <q-input
            v-model="form.userFirstName"
            :label="$t('registration.firstName')"
            :hint="$t('registration.firstNameHint')"
            outlined
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userLastName"
            :label="$t('registration.lastName')"
            :hint="$t('registration.lastNameHint')"
            outlined
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userAccountName"
            :label="$t('registration.username')"
            :hint="$t('registration.usernameHint')"
            outlined
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-input
            v-model="form.userEmail"
            :label="$t('registration.email')"
            :hint="$t('registration.emailHint')"
            outlined
            type="email"
            :rules="[val => !!val || $t('registration.validation.required'), val => /.+@.+\..+/.test(val) || $t('registration.validation.email')]"
          />
          <q-input
            v-model="form.userPassword"
            :label="$t('registration.password')"
            :hint="$t('registration.passwordHint')"
            outlined
            type="password"
            :rules="[val => !!val || $t('registration.validation.required'), val => val.length >= 6 || $t('registration.validation.minLength')]"
          />
          <q-input
            v-model="form.confirmPassword"
            :label="$t('registration.confirmPassword')"
            :hint="$t('registration.confirmPasswordHint')"
            outlined
            type="password"
            :rules="[val => val === form.userPassword || $t('registration.validation.matchPassword')]"
          />
          <q-checkbox
            v-model="form.terms"
            :label="$t('registration.termsLabel')"
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-btn :label="$t('registration.submitButton')" type="submit" color="primary" class="register-button" />
          <div class="studio-link" @click="navigateToStudio">{{ $t('registration.studioLink') }}</div>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        userFirstName: '',
        userLastName: '',
        userAccountName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
        terms: false
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          axios
            .post('http://localhost:3000/api/users', {
              userFirstName: this.form.userFirstName,
              userLastName: this.form.userLastName,
              userAccountName: this.form.userAccountName,
              userEmail: this.form.userEmail,
              userPassword: this.form.userPassword
            })
            .then(response => {
              alert(this.$t('registration.successMessage'));
              console.log('Response:', response.data);
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response?.data?.message || error.message);
              alert(this.$t('registration.errorMessage'));
            });
        }
      });
    },
    onReset() {
      this.$refs.form.reset();
    },
    navigateToStudio() {
      this.$router.push('/studio-registration');
    }
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--page-background-color);
}

.register-card {
  background-color: var(--card-background-color);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
}

.register-button {
  background-color: var(--button-background-color);
  color: var(--button-text-color);
}

.studio-link {
  text-align: center;
  margin-top: 16px;
  color: var(--link-color);
  cursor: pointer;
}
</style>
