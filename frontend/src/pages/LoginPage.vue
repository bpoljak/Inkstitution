<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" ref="form">
      <div class="q-gutter-md">

        <q-input
          v-model="form.userEmail"
          label="Email"
          hint="Enter your email"
          outlined
          type="email"
          :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Enter a valid email']"
        />

        <q-input
          v-model="form.userPassword"
          label="Password"
          type="password"
          hint="Enter your password"
          outlined
          :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Password must be at least 6 characters']"
        />

        <div class="row justify-center q-col-gutter-md q-mt-md">
          <q-btn label="Log In" type="submit" color="primary" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
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
              alert('Login successfull!');
              console.log('Response:', response.data);
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response.data.message || error.message);
              alert('An error occurred during log in.');
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
</style>
