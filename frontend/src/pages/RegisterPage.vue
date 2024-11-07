<template>
  <q-page class="q-pa-md">
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
            :rules="[
              val => !!val || $t('registration.validation.required'),
              val => /.+@.+\..+/.test(val) || $t('registration.validation.email')
            ]"
          />
          <q-input
            v-model="form.userPassword"
            :label="$t('registration.password')"
            :hint="$t('registration.passwordHint')"
            outlined
            type="password"
            :rules="[
              val => !!val || $t('registration.validation.required'),
              val => val.length >= 6 || $t('registration.validation.minLength')
            ]"
          />
          <q-input
            v-model="form.confirmPassword"
            :label="$t('registration.confirmPassword')"
            :hint="$t('registration.confirmPasswordHint')"
            outlined
            type="password"
            :rules="[
              val => val === form.userPassword || $t('registration.validation.matchPassword')
            ]"
          />
          <q-checkbox
            v-model="form.terms"
            :label="$t('registration.termsLabel')"
            :rules="[val => !!val || $t('registration.validation.required')]"
          />
          <q-btn :label="$t('registration.submitButton')" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
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
        }
      });
    }
  }
};
</script>

<style scoped>
.register-card {
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;
}
</style>
