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
export default {
  data() {
    return {
      faqs: [
        { question: "", answer: "", visible: false },
        { question: "", answer: "", visible: false },
        { question: "", answer: "", visible: false },
        { question: "", answer: "", visible: false },
        { question: "", answer: "", visible: false },
      ],
    };
  },
  mounted() {
    // Popunjavaj FAQ tekstove nakon što je komponenta montirana
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
}

/* Light Mode */
.light-mode {
  background: #ffffff !important; /* Čista bela pozadina */
}

.light-mode .about-content {
  color: #000; /* Crni tekst za light mode */
}

.light-mode .faq-section {
  background-color: #f9f9f9; /* Svetla pozadina za light mode */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Lagana senka */
}

.light-mode .box-title {
  color: #000; /* Crni tekst za light mode */
}

.light-mode .about-text {
  color: #000; /* Crni tekst za light mode */
  background-color: #ffffff; /* Bela pozadina */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* Blaga senka */
}

/* Dark Mode */
.dark-mode {
  background: linear-gradient(135deg, #232526, #414345) !important; /* Gradient za dark mode */
}

.dark-mode .about-content {
  color: #fff; /* Beli tekst za dark mode */
}

.dark-mode .faq-section {
  background-color: rgba(255, 255, 255, 0.05); /* Tamnija pozadina za dark mode */
}

.dark-mode .box-title {
  color: white; /* Beli tekst za dark mode */
}

.dark-mode .about-text {
  color: #fff; /* Beli tekst za dark mode */
  background-color: rgba(255, 255, 255, 0.1); /* Transparentna pozadina */
}

/* Background Overlay */
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: linear-gradient(135deg, #232526, #414345) !important;
  z-index: 1;
}

/* About Content */
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

/* FAQ Box */
.faq-box {
  width: 100%;
}

.faq-section {
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2); /* Dodata senka */
}

/* Box Title (FAQ Questions) */
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

/* FAQ Answer (Clicked Question) */
.about-text {
  padding: 15px;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.05); /* Default background */
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

/* Media Queries */
@media (prefers-color-scheme: dark) {
  .about-text {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .faq-section {
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
