<template>
  <q-page :class="{ 'dark-mode': $q.dark.isActive }">
    <div>
      <div
        class="hero-card"
        :class="{
          'content-card-dark': $q.dark.isActive,
          'content-card-light': !$q.dark.isActive,
        }"
      >
        <div class="q-pa-md text-center hero-content">
          <h1
            :class="{
              'text-white': $q.dark.isActive,
              'text-black': !$q.dark.isActive,
            }"
          >
            <span v-if="userName">
              {{ $t("welcomeMessage", { name: "" }) }}
              <span class="text-gradient-light">{{ userName }}</span>
            </span>
            <span v-else>
              {{ $t("indexPage.chooseYour") }}
              <span class="text-gradient-light">{{
                $t("indexPage.artist")
              }}</span>
            </span>
          </h1>
          <p
            :class="{
              'text-light-gray': $q.dark.isActive,
              'text-dark-purple': !$q.dark.isActive,
            }"
          >
            {{ $t("indexPage.fastAndSimple") }}
          </p>
          <q-btn
            color="gradient-light"
            :label="$t('indexPage.explore')"
            class="q-my-md"
            @click="goToStudios"
          />
        </div>
      </div>
      <div v-if="!isLoggedIn" class="parent-card">
        <div class="flex-cards q-my-lg q-gutter-lg">
          <q-card
            :class="{
              'small-card-dark': $q.dark.isActive,
              'small-card-light': !$q.dark.isActive,
            }"
            class="q-pa-md child-card equal-height"
          >
            <q-card-section class="text-center card-content">
              <q-icon
                name="layers"
                size="50px"
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="icon-style"
              />
              <h2 class="text-gradient-light">
                {{ $t("indexPage.missionTitle") }}
              </h2>
              <p
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="text-spacing"
              >
                {{ $t("indexPage.missionDescription1") }}
              </p>
              <p
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="text-spacing"
              >
                {{ $t("indexPage.missionDescription2") }}
              </p>
              <q-btn
                color="gradient-light"
                :label="$t('indexPage.missionButton')"
                class="q-my-md align-button"
                @click="goToAboutUs"
              />
            </q-card-section>
          </q-card>
          <q-card
            :class="{
              'small-card-dark': $q.dark.isActive,
              'small-card-light': !$q.dark.isActive,
            }"
            class="q-pa-md child-card equal-height"
          >
            <q-card-section class="text-center card-content">
              <q-icon
                name="groups"
                size="50px"
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="icon-style"
              />
              <h2 class="text-gradient-light">
                {{ $t("indexPage.createAccountTitle") }}
              </h2>
              <p
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="text-spacing"
              >
                {{ $t("indexPage.createAccountDescription1") }}
              </p>
              <p
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="text-spacing"
              >
                {{ $t("indexPage.createAccountDescription2") }}
              </p>
              <q-btn
                color="gradient-light"
                :label="$t('indexPage.createAccountButton')"
                class="q-my-md align-button"
                @click="goToRegister"
              />
            </q-card-section>
          </q-card>
          <q-card
            :class="{
              'small-card-dark': $q.dark.isActive,
              'small-card-light': !$q.dark.isActive,
            }"
            class="q-pa-md child-card equal-height"
          >
            <q-card-section class="text-center card-content">
              <q-icon
                name="store"
                size="50px"
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="icon-style"
              />
              <h2 class="text-gradient-light">
                {{ $t("indexPage.ownStudioTitle") }}
              </h2>
              <p
                :class="{
                  'text-white': $q.dark.isActive,
                  'text-black': !$q.dark.isActive,
                }"
                class="text-spacing"
              >
                {{ $t("indexPage.ownStudioDescription") }}
              </p>
              <q-btn
                color="gradient-light"
                :label="$t('indexPage.ownStudioButton')"
                class="q-my-md align-button"
                @click="goToStudioRegister"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const userName = ref(null);
    const router = useRouter();

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/users/session`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.userId) {
          isLoggedIn.value = true;
          userName.value = response.data.userFirstName;
        } else {
          isLoggedIn.value = false;
        }
      } catch (error) {
        isLoggedIn.value = false;
      }
    };

    const goToAboutUs = () => {
      router.push("/about");
    };
    const goToRegister = () => {
      router.push("/register");
    };
    const goToStudioRegister = () => {
      router.push("/studio-register");
    };
    const goToStudios = () => {
      router.push("/studios");
    };


    onMounted(checkLoginStatus);

    return {
      isLoggedIn,
      userName,
      goToAboutUs,
      goToRegister,
      goToStudioRegister,
      goToStudios
    };
  },
};
</script>

<style scoped>
.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.hero-card {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0 !important;
}

.hero-content {
  margin-top: 50px;
  text-align: center;
  color: var(--text-color-light);
}

.parent-card {
  width: 100%;
  margin: 0;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 0 !important;
}

.child-card {
  flex: 1;
  padding: 20px;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.child-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.q-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 12px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

.content-card-light {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-card-dark {
  background: linear-gradient(135deg, #232526, #414345);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  text-align: center;
}

.flex-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
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
  background-color: rgba(51, 51, 51, 0.8);
  border-radius: 12px;
}

.header-bar .profile-button {
  margin-right: 10px;
}

.logout-button {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  border-radius: 8px;
  padding: 8px 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}

.logout-button:hover {
  transform: scale(1.05);
}

.small-card-dark {
  background: rgb(24, 24, 24);
}

.small-card-light {
  background: white;
}

.text-gradient-light {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

@media (max-width: 768px) {
  .hero-card {
    height: 92vh;
  }

  .hero-content {
    margin-top: 20px;
    padding: 10px;
    word-wrap: break-word;
  }

  .hero-content h1 {
    font-size: 1.5rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .flex-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 0 10px;
    margin: 0;
  }

  .child-card {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .card-content h2 {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .card-content p {
    font-size: 0.9rem;
  }

  .q-btn {
    font-size: 0.9rem;
    padding: 10px 15px;
  }
}
</style>
