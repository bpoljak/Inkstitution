<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md form-card">
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" ref="form">
          <div class="q-gutter-md">
            <q-input
              v-model="form.userFirstName"
              :label="t('registration.firstName')"
              :hint="t('registration.firstNameHint')"
              outlined
              class="input-field"
              :rules="[val => !!val || t('registration.firstName') + ' ' + t('validation.required')]"
            />

            <q-input
              v-model="form.userLastName"
              :label="t('registration.lastName')"
              :hint="t('registration.lastNameHint')"
              outlined
              class="input-field"
              :rules="[val => !!val || t('registration.lastName') + ' ' + t('validation.required')]"
            />

            <q-input
              v-model="form.userAccountName"
              :label="t('registration.username')"
              :hint="t('registration.usernameHint')"
              outlined
              class="input-field"
              :rules="[val => !!val || t('registration.username') + ' ' + t('validation.required')]"
            />

            <q-input
              v-model="form.userEmail"
              :label="t('registration.email')"
              :hint="t('registration.emailHint')"
              outlined
              type="email"
              class="input-field"
              :rules="[
                val => !!val || t('registration.email') + ' ' + t('validation.required'),
                val => /.+@.+\..+/.test(val) || t('validation.invalidEmail')
              ]"
            />

            <q-input
              v-model="form.userPassword"
              :label="t('registration.password')"
              type="password"
              :hint="t('registration.passwordHint')"
              outlined
              class="input-field"
              :rules="[
                val => !!val || t('registration.password') + ' ' + t('validation.required'),
                val => val.length >= 6 || t('validation.passwordLength')
              ]"
            />

            <q-input
              v-model="form.confirmPassword"
              :label="t('registration.confirmPassword')"
              type="password"
              :hint="t('registration.confirmPasswordHint')"
              outlined
              class="input-field"
              :rules="[
                val => val === form.userPassword || t('validation.passwordMatch')
              ]"
            />

            <div class="terms-container">
              <q-checkbox
                v-model="form.terms"
                :label="t('registration.termsLabel')"
                :rules="[val => !!val || t('registration.termsError')]"
              />
            </div>

            <q-item>
              <q-item-section>
                <q-btn flat color="primary" :label="t('registration.studioLink')" @click="redirectToStudio" />
              </q-item-section>
            </q-item>

            <div class="row justify-center q-mt-md">
              <q-btn :label="t('registration.submitButton')" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useI18n } from "vue-i18n";
import axios from 'axios';

export default {
  setup() {
    const { t } = useI18n();
    return { t };
  },
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
              alert(this.t('registration.successMessage'));
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response.data.message || error.message);
              alert(this.t('registration.errorMessage'));
            });
        }
      });
    },
    onReset() {
      this.$refs.form.reset();
    },
    redirectToStudio() {
      this.$router.push('/studio-registration');
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 500px;
  margin: auto;
}

.form-card {
  max-width: 500px;
  margin: auto;
  background: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-field .q-field__control {
  background-color: white;
  border-radius: 4px;
}

.terms-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
