<template>
  <q-page
    class="q-pa-md about-page"
    :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }"
  >
    <div class="background-overlay"></div>

    <div class="about-content">
      <div class="text-section">
        <h2>{{ $t('aboutPage.goalTitle') }}</h2>
        <p>
          {{ $t('aboutPage.goalDescription') }}
        </p>
      </div>

      <div class="faq-box">
        <div class="faq-section" v-for="(faq, index) in faqs" :key="index">
          <div class="box-title" @click="toggleFaq(index)">
            {{ faq.question }}
          </div>
          <transition name="expand">
            <div v-if="faq.visible" class="about-text">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { watch } from "vue";

export default {
  data() {
    return {
      faqs: [],
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].visible = !this.faqs[index].visible;
    },
    updateFaqs() {
      this.faqs = [
        {
          question: this.$t('aboutPage.faq.whoAreWe.question'),
          answer: this.$t('aboutPage.faq.whoAreWe.answer'),
          visible: false,
        },
        {
          question: this.$t('aboutPage.faq.bookingProcess.question'),
          answer: this.$t('aboutPage.faq.bookingProcess.answer'),
          visible: false,
        },
        {
          question: this.$t('aboutPage.faq.paymentOptions.question'),
          answer: this.$t('aboutPage.faq.paymentOptions.answer'),
          visible: false,
        },
        {
          question: this.$t('aboutPage.faq.viewPreviousWorks.question'),
          answer: this.$t('aboutPage.faq.viewPreviousWorks.answer'),
          visible: false,
        },
        {
          question: this.$t('aboutPage.faq.careProducts.question'),
          answer: this.$t('aboutPage.faq.careProducts.answer'),
          visible: false,
        },
      ];
    },
  },
  watch: {
    '$i18n.locale': 'updateFaqs',
  },
  mounted() {
    this.updateFaqs();
  },
};
</script>

<style scoped>
.about-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
}

.light-mode {
  background: #ffffff !important;
}

.light-mode .about-content {
  color: #000;
}

.light-mode .faq-section {
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.light-mode .box-title {
  color: #000;
}

.light-mode .about-text {
  color: #000;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345) !important;
}

.dark-mode .about-content {
  color: #fff;
}

.dark-mode .faq-section {
  background-color: rgba(255, 255, 255, 0.05);
}

.dark-mode .box-title {
  color: white;
}

.dark-mode .about-text {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: linear-gradient(135deg, #232526, #414345) !important;
  z-index: 1;
}

.about-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  color: white;
  max-width: 800px;
  text-align: center;
}

.text-section h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.text-section p {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.faq-box {
  width: 100%;
}

.faq-section {
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
}

.box-title {
  cursor: pointer;
  padding: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  border-radius: 40px;
  text-align: left;
  transition: background 0.3s ease, transform 0.2s;
}

.box-title:hover {
  transform: scale(1.02);
}

.about-text {
  padding: 15px;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (max-width: 768px) {
  .box-title {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }

  .faq-section {
    width: 100%;
    max-width: 100%;
  }

  .about-content {
    padding: 10px;
  }

  .text-section h2 {
    font-size: 1.8rem;
  }

  .text-section p {
    font-size: 1rem;
  }
}


</style>
