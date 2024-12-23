<template>
  <q-page class="about-page">
    
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
      </div> <!-- asdasdasdadasdasdasd-->
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
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
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].visible = !this.faqs[index].visible;
    },
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
  background: url('C:\dino\Inkstitution\Inkstitution\frontend\src\assets\majstor.jpg') no-repeat center center;
  background-size: cover;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
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
}

.box-title {
  cursor: pointer;
  padding: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #4a90e2, #357ABD);
  color: white;
  border-radius: 10px;
  text-align: left;
  transition: background 0.3s ease, transform 0.2s;
}

.box-title:hover {
  background: linear-gradient(135deg, #357ABD, #285A8D);
  transform: scale(1.02);
}

.about-text {
  padding: 15px;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
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

@media (prefers-color-scheme: dark) {
  .about-text {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .faq-section {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .box-title {
    background: linear-gradient(135deg, #285A8D, #1f4875);
  }
}
</style>
