<template>
  <q-page class="appointments-page" :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }">
    <div class="appointments-container">
      <q-input
        filled
        v-model="searchQuery"
        :label="$t('appointmentsPage.searchBar.label')"
        debounce="300"
        class="search-bar"
        :placeholder="$t('appointmentsPage.searchBar.placeholder')"
      />
      <q-card
        v-for="appointment in filteredAppointments"
        :key="appointment.AppointmentID"
        class="appointment-card"
        :class="{ 'appointment-card-dark': $q.dark.isActive, 'appointment-card-light': !$q.dark.isActive }"
      >
        <div class="studio-logo">
          <img
            :src="appointment.StudioProfileImageLink || '/path/to/default-image.png'"
            alt="Studio Logo"
          />
        </div>
        <div class="appointment-details">
          <h2>{{ appointment.StudioName }}</h2>
          <p>{{ appointment.StudioCity }}, {{ appointment.StudioAddress }}</p>
          <p>{{ formatDate(appointment.AppointmentDate) }} - {{ appointment.AppointmentTime }}</p>
          <p>{{ $t('appointmentsPage.status') }}: {{ appointment.Status }}</p>
        </div>
        <div class="actions">
          <q-btn
            color="primary"
            :label="$t('appointmentsPage.buttons.update')"
            @click="updateAppointment(appointment.AppointmentID)"
          />
          <q-btn
            color="red"
            icon="delete"
            :label="$t('appointmentsPage.buttons.delete')"
            @click="deleteAppointment(appointment.AppointmentID)"
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const appointments = ref([]);
    const searchQuery = ref("");
    const searchDate = ref("");
    const userId = ref(null);
    const router = useRouter();

    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/users/session`,
          { withCredentials: true }
        );
        userId.value = response.data.userId;
        fetchAppointments();
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    const fetchAppointments = async () => {
      if (!userId.value) return;
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/appointments/user/${userId.value}`
        );
        appointments.value = response.data;
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const deleteAppointment = async (id) => {
      try {
        await axios.delete(`${process.env.API_URL}/api/appointments/${id}`);
        appointments.value = appointments.value.filter(
          (appointment) => appointment.AppointmentID !== id
        );
        console.log("Appointment deleted and list updated.");
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    };

    const updateAppointment = (id) => {
      console.log("Navigating to update page with ID:", id);
      router.push({ path: "/appointmentUpdate", query: { id } });
    };

    const filteredAppointments = computed(() => {
      let result = appointments.value;

      if (searchQuery.value) {
        result = result.filter((appointment) =>
          appointment.StudioName.toLowerCase().includes(
            searchQuery.value.toLowerCase()
          )
        );
      }

      if (searchDate.value) {
        result = result.filter(
          (appointment) => appointment.AppointmentDate === searchDate.value
        );
      }

      return result;
    });

    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    };

    onMounted(fetchUserId);

    return {
      appointments,
      searchQuery,
      searchDate,
      filteredAppointments,
      deleteAppointment,
      updateAppointment,
      formatDate,
    };
  },
};
</script>

<style scoped>
.appointments-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  width: 100%;
  max-width: 900px;
}

.appointments-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 900px;
}

.appointment-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: var(--q-surface);
  color: var(--q-text-primary);
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--q-text-secondary);
}

.appointment-details h2 {
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.studio-logo img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.appointment-card-light {
  background: white;
}

.appointment-card-dark {
  background: rgb(24, 24, 24);
}

@media screen and (max-width: 768px) {
  .appointments-page {
    padding: 10px;
  }

  .search-bar {
    margin-bottom: 15px;
    width: 100%;
  }

  .appointments-container {
    gap: 15px;
  }

  .appointment-card {
    padding: 15px;
    gap: 10px;
  }

  .studio-logo img {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
  }

  .appointment-details h2 {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .appointment-details p {
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .actions {
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }

  .actions q-btn {
    width: 100%;
  }
}
</style>

