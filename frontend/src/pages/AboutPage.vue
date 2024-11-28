<template>
  <q-page class="about-page">
    <div class="about-content">
      <div class="text-section">
        <h2>{{ $t('aboutPage.goalTitle') }}</h2>
        <p>
          {{ $t('aboutPage.goalDescription') }}
        </p>
      </div>

      <div class="image-section">
        <img src="/images/aboutyou.jpg" alt="Tetoviranje u toku" />

        <!-- FAQ Box -->
        <div class="faq-box">
          <div class="about-section faq-section" v-for="(faq, index) in faqs" :key="index">
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
          visible: false
        },
        {
          question: this.$t('aboutPage.faq.bookingProcess.question'),
          answer: this.$t('aboutPage.faq.bookingProcess.answer'),
          visible: false
        },
        {
          question: this.$t('aboutPage.faq.paymentOptions.question'),
          answer: this.$t('aboutPage.faq.paymentOptions.answer'),
          visible: false
        },
        {
          question: this.$t('aboutPage.faq.viewPreviousWorks.question'),
          answer: this.$t('aboutPage.faq.viewPreviousWorks.answer'),
          visible: false
        },
        {
          question: this.$t('aboutPage.faq.careProducts.question'),
          answer: this.$t('aboutPage.faq.careProducts.answer'),
          visible: false
        }
      ]
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].visible = !this.faqs[index].visible;
    }
  }
};
</script>

<style scoped>
/* CSS kod ostaje isti */
.about-page {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #80deea); /* Dodan gradijent pozadine */
  min-height: 100vh; /* Pozadina će pokriti cijelu visinu stranice */
}

.about-content {
  display: flex;
  width: 100%;
}

.text-section {
  width: 50%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -450px; /* Podiže tekst prema gore */
}

.text-section h2 {
  font-size: 1.75rem;
  font-weight: bold;
  font-family: Arial, sans-serif; /* Promijenjen font za naslov */
}

.image-section {
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

img {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.faq-box {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.faq-section {
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05); /* Lagana prozirna pozadina za čišći izgled */
  margin-top: 15px;
  opacity: 0.9; /* Blaga prozirnost */
  box-shadow: none; /* Uklanja bijeli okvir/sjenu */
}

.box-title {
  cursor: pointer;
  padding: 10px;
  background: linear-gradient(135deg, #4a90e2, #357ABD);
  color: #fff;
  border-radius: 10px;
  transition: background 0.3s ease, transform 0.2s;
}

.box-title:hover {
  background: linear-gradient(135deg, #357ABD, #285A8D);
  transform: scale(1.02);
}

.about-text {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  color: #333;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.4s ease;
}
.expand-enter, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (prefers-color-scheme: dark) {
  .about-text {
    background-color: #333;
    color: #f9f9f9;
    border: 1px solid #444;
  }
  
  .faq-section {
    background-color: #444;
    opacity: 0.85; /* Još niža opacity za tamni mod */
  }

  .box-title {
    background: linear-gradient(135deg, #357ABD, #285A8D);
  }
  .box-title:hover {
    background: linear-gradient(135deg, #285A8D, #1f4875);
  }
}
</style>
