<template>
  <q-page :class="{ 'dark-mode': $q.dark.isActive }">
    <q-card
      class="hero-card"
      :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
    >
      <div class="q-pa-md text-center hero-content">
        <h1 :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }">
          <span v-if="userName">{{ $t('welcomeMessage', { name: userName }) }}</span>
          <span v-else>
            {{ $t('indexPage.chooseYour') }}
            <span class="text-gradient-light">{{ $t('indexPage.artist') }}</span>
          </span>
        </h1>
        <p
          :class="{
            'text-light-gray': $q.dark.isActive,
            'text-dark-purple': !$q.dark.isActive,
          }"
        >
          {{ $t('indexPage.fastAndSimple') }}
        </p>
        <q-btn color="gradient-light" :label="$t('indexPage.explore')" class="q-my-md" />
      </div>
    </q-card>

    <!-- Prikaz parent-card samo ako korisnik NIJE ulogiran -->
    <q-card
      v-if="!isLoggedIn"
      class="parent-card"
      :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
    >
      <div class="flex-cards q-my-lg q-gutter-lg">
        <q-card
          :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
          class="q-pa-md child-card equal-height"
        >
          <q-card-section class="text-center card-content">
            <q-icon
              name="layers"
              size="50px"
              :class="{ 'text-primary': $q.dark.isActive, 'text-secondary': !$q.dark.isActive }"
              class="icon-style"
            />
            <h2 class="text-gradient-light">{{ $t('indexPage.missionTitle') }}</h2>
            <p
              :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }"
              class="text-spacing"
            >
              {{ $t('indexPage.missionDescription1') }}
            </p>
            <p
              :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }"
              class="text-spacing"
            >
              {{ $t('indexPage.missionDescription2') }}
            </p>
            <q-btn
              color="gradient-light"
              :label="$t('indexPage.missionButton')"
              class="q-my-md align-button"
              @click="goToAboutUs()"
            />
          </q-card-section>
        </q-card>

        <q-card
          :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
          class="q-pa-md child-card equal-height"
        >
          <q-card-section class="text-center card-content">
            <q-icon
              name="groups"
              size="50px"
              :class="{ 'text-primary': $q.dark.isActive, 'text-secondary': !$q.dark.isActive }"
              class="icon-style"
            />
            <h2 class="text-gradient-light">{{ $t('indexPage.createAccountTitle') }}</h2>
            <p
              :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }"
              class="text-spacing"
            >
              {{ $t('indexPage.createAccountDescription1') }}
            </p>
            <p
              :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }"
              class="text-spacing"
            >
              {{ $t('indexPage.createAccountDescription2') }}
            </p>
            <q-btn
              color="gradient-light"
              :label="$t('indexPage.createAccountButton')"
              class="q-my-md align-button"
              @click="goToRegister()"
            />
          </q-card-section>
        </q-card>

        <q-card
          :class="{ 'content-card-dark': $q.dark.isActive, 'content-card-light': !$q.dark.isActive }"
          class="q-pa-md child-card equal-height"
        >
          <q-card-section class="text-center card-content">
            <q-icon
              name="store"
              size="50px"
              :class="{ 'text-primary': $q.dark.isActive, 'text-secondary': !$q.dark.isActive }"
              class="icon-style"
            />
            <h2 class="text-gradient-light">{{ $t('indexPage.ownStudioTitle') }}</h2>
            <p
              :class="{ 'text-white': $q.dark.isActive, 'text-black': !$q.dark.isActive }"
              class="text-spacing"
            >
              {{ $t('indexPage.ownStudioDescription') }}
            </p>
            <q-btn
              color="gradient-light"
              :label="$t('indexPage.ownStudioButton')"
              class="q-my-md align-button"
              @click="goToStudioRegister()"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const userName = ref(null);

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/users/session`, {
          withCredentials: true,
        });
        if (response.data && response.data.userName) {
          isLoggedIn.value = true;
          userName.value = response.data.userName;
        } else {
          isLoggedIn.value = false;
        }
      } catch (error) {
        isLoggedIn.value = false;
      }
    };

    onMounted(checkLoginStatus);

    return {
      isLoggedIn,
      userName,
      goToAboutUs() {
        this.$router.push("/about");
      },
      goToRegister() {
        this.$router.push("/register");
      },
      goToStudioRegister() {
        this.$router.push("/studio-register");
      },
    };
  },
};
</script>



<style scoped>
.dark-mode {
  background: var(--page-background-color-dark);
  color: white;
}

.hero-card {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 60px 0;
}

.hero-content {
  margin-top: 50px;
}

.parent-card {
  width: 100%;
  margin: 20px auto;
  padding: 30px;
}

.child-card {
  flex: 1;
}

.text-gradient-light {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.q-btn {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: white;
}

.text-dark-purple {
  color: #5a2d7b;
}

.text-light-gray {
  color: #b0b0b0;
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

.content-card-light {
  background: var(--card-background-color-light);
  border-radius: 10px;
}

.content-card-dark {
  background: var(--card-background-color-dark);
  border-radius: 10px;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.flex-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.q-my-lg {
  margin-top: 40px;
  margin-bottom: 40px;
}

.q-gutter-lg {
  gap: 30px;
}

.header-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background-color: #333;
}

.header-bar .profile-button {
  margin-right: 10px;
}

.logout-button {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: white;
  border-radius: 8px;
  padding: 5px 15px;
}
</style>
