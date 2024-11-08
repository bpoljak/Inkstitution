<template>
  <q-page class="q-pa-md login-page">
    <q-card class="login-card">
      <q-form @submit="onSubmit" ref="form">
        <div class="q-gutter-md">
          <q-input
            v-model="form.userEmail"
            :label="$t('login.email')"
            :hint="$t('login.emailHint')"
            outlined
            type="email"
            :rules="[val => !!val || $t('login.validation.required')]"
          />
          <q-input
            v-model="form.userPassword"
            :label="$t('login.password')"
            :hint="$t('login.passwordHint')"
            outlined
            type="password"
            :rules="[val => !!val || $t('login.validation.required')]"
          />
          <q-btn :label="$t('login.submitButton')" type="submit" color="primary" class="login-button" />
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
        userEmail: '',
        userPassword: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          axios
            .post('http://localhost:3000/api/users/login', {
              userEmail: this.form.userEmail,
              userPassword: this.form.userPassword
            })
            .then(response => {
              alert(this.$t('login.successMessage'));
              console.log('Response:', response.data);
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response?.data?.message || error.message);
              alert(this.$t('login.errorMessage'));
            });
        }
      });
    },
    onReset() {
      this.form.userEmail = '';
      this.form.userPassword = '';
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--page-background-color);
}

.login-card {
  background-color: var(--card-background-color);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
}

.login-button {
  background-color: var(--button-background-color);
  color: var(--button-text-color);
}
</style>
