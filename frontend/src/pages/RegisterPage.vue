<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" ref="form">
      <div class="q-gutter-md">
        <q-input
          v-model="form.userFirstName"
          label="First name"
          hint="Enter your first name"
          outlined
          :rules="[val => !!val || 'First name is required']"
        />

        <q-input
          v-model="form.userLastName"
          label="Last name"
          hint="Enter your last name"
          outlined
          :rules="[val => !!val || 'Last name is required']"
        />

        <q-input
          v-model="form.userAccountName"
          label="Username"
          hint="Enter your username"
          outlined
          :rules="[val => !!val || 'Username is required']"
        />

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

        <q-input
          v-model="form.confirmPassword"
          label="Confirm Password"
          type="password"
          hint="Re-enter your password"
          outlined
          :rules="[val => val === form.userPassword || 'Passwords must match']"
        />

        <q-checkbox
          v-model="form.terms"
          label="I agree to the terms and conditions"
          :rules="[val => !!val || 'You must accept the terms']"
        />

        <div class="row justify-center q-col-gutter-md q-mt-md">
          <q-btn label="Register now" type="submit" color="primary" />
          <q-btn label="Cancel" type="reset" color="negative" flat />
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
              alert('Registration successfull!');
              console.log('Response:', response.data);
              this.onReset();
            })
            .catch(error => {
              console.error('Error:', error.response.data.message || error.message);
              alert('An error occurred during registration.');
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
