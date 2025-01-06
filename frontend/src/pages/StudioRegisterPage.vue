<template>
  <q-page class="q-pa-md register-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <q-card class="register-card" :class="{ 'card-dark': $q.dark.isActive, 'card-light': !$q.dark.isActive }">
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
          <q-btn :label="$t('studioRegistration.submitButton')" type="submit" class="register-button" />
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
          studioPhone: this.formData.studioPhone,
          studioEmail: this.formData.studioEmail,
          studioPassword: this.formData.studioPassword,
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

.card-dark {
  background: rgb(24, 24, 24);
  color: white;
}

.card-light {
  background: white;
  color: black;
}

.q-input,
.q-checkbox {
  background: transparent;
  border-color: var(--q-text-secondary);
  color: var(--q-text-primary);
}

.q-input::placeholder,
.q-checkbox::placeholder {
  color: var(--q-text-secondary);
}

.register-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 8px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
  .register-page {
    padding: 10px;
    height: auto;
  }

  .register-card {
    max-width: 95%;
    padding: 12px;
    height: auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }

  .form-content {
    gap: 6px;
  }

  .q-input,
  .q-checkbox {
    font-size: 0.8rem;
  }

  .register-button {
    padding: 6px 14px;
    font-size: 0.85rem;
  }

  .studio-link {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}
</style>


