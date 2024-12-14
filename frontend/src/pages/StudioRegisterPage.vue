<template>
  <q-page class="q-pa-md register-page">
    <q-card class="register-card">
      <q-form @submit="validateForm" ref="form">
        <div class="q-gutter-md">
          <q-input
            v-model="formData.studioName"
            :label="$t('studioRegistration.studioName')"
            :hint="$t('studioRegistration.studioNameHint')"
            outlined
            :rules="[val => !!val || $t('studioRegistration.validation.required')]"
          />
          <q-input
            v-model="formData.address"
            :label="$t('studioRegistration.address')"
            :hint="$t('studioRegistration.addressHint')"
            outlined
            :rules="[val => !!val || $t('studioRegistration.validation.required')]"
          />
          <q-input
            v-model="formData.phone"
            :label="$t('studioRegistration.phone')"
            :hint="$t('studioRegistration.phoneHint')"
            outlined
            :rules="[val => !!val || $t('studioRegistration.validation.required')]"
          />
          <q-input
            v-model="formData.ownerEmail"
            :label="$t('studioRegistration.ownerEmail')"
            :hint="$t('studioRegistration.ownerEmailHint')"
            outlined
            type="email"
            :rules="[val => !!val || $t('studioRegistration.validation.required'), val => /.+@.+\..+/.test(val) || $t('studioRegistration.validation.email')]"
          />
          <q-input
            v-model="formData.password"
            :label="$t('studioRegistration.password')"
            :hint="$t('studioRegistration.passwordHint')"
            outlined
            type="password"
            :rules="[val => !!val || $t('studioRegistration.validation.required'), val => val.length >= 6 || $t('studioRegistration.validation.minLength')]"
          />
          <q-checkbox
            v-model="formData.termsAccepted"
            :label="$t('studioRegistration.termsLabel')"
            :rules="[val => !!val || $t('studioRegistration.validation.required')]"
          />
          <q-btn :label="$t('studioRegistration.submitButton')" type="submit" color="primary" class="register-button" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudioRegister',
  data() {
    return {
      formData: {
        studioName: '',
        studioAddress: '',
        studioPhone: '',
        studioEmail: '',
        studioPassword: '',
        termsAccepted: false,
      },
      isSubmitting: false,
    };
  },
  methods: {
    validateForm() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.registerStudio();
        }
      });
    },

    async registerStudio() {
      this.isSubmitting = true;
      try {
        const response = await axios.post('http://localhost:3000/api/studios', {
          studioName: this.formData.studioName,
          studioAddress: this.formData.studioAddress,
          studioPhone: this.formData.phone,
          studioEmail: this.formData.ownerEmail,
          studioPassword: this.formData.password,
        });

        this.$q.notify({
          type: 'positive',
          message: this.$t('studioRegistration.successMessage'),
        });
        this.resetForm();
      } catch (error) {
        console.error('Error registering studio:', error.response?.data?.message || error.message);
        this.$q.notify({
          type: 'negative',
          message: this.$t('studioRegistration.errorMessage'),
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        studioName: '',
        address: '',
        phone: '',
        ownerEmail: '',
        password: '',
        termsAccepted: false,
      };
    },
  },
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
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
</style>
