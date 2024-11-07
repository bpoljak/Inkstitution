<template>
  <q-page class="q-pa-md">
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
          <div class="row justify-center q-col-gutter-md q-mt-md">
            <q-btn :label="$t('login.submitButton')" type="submit" color="primary" />
          </div>
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
            .post('http://localhost:3000/api/users', {
              userEmail: this.form.userEmail,
              userPassword: this.form.userPassword
            })
            .then(response => {
              alert('Login successful!');
              console.log('Response:', response.data);
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response.data.message || error.message);
              alert('An error occurred during login.');
            });
        }
      });
    },
    onReset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.q-page {
  max-width: 400px;
  margin: auto;
}
.login-card {
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
}
</style>
