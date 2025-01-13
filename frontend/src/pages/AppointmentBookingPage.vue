<template>
  <div>
    <q-page class="q-pa-md booking-page">
      <h1 class="text-center page-title">
        {{ $t("appointmentPage.bookAppointment") }}
      </h1>

      <div class="booking-container">
        <q-date
          v-model="selectedDate"
          mask="YYYY-MM-DD"
          bordered
          class="q-mb-md q-ma-md date-picker"
          :locale="$i18n.locale"
          @update:model="fetchAvailableAppointments"
        />

        <div class="q-mt-lg time-slots-container">
          <h3 class="text-center time-slots-title">
            {{ $t("appointmentPage.timeSlotsFor") }} {{ selectedDate }}
          </h3>
          <div class="time-slots-grid">
            <div
              v-for="(slot, index) in timeSlots"
              :key="index"
              class="q-pa-xs q-ma-xs time-slot"
            >
              <q-btn
                :label="slot.time"
                :color="slot.isBooked ? 'red' : 'green'"
                :disable="slot.isBooked"
                @click="bookAppointment(slot.time)"
                outline
                size="sm"
                class="full-width time-slot-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const route = useRoute();
    const selectedDate = ref(new Date().toISOString().split("T")[0]);
    const timeSlots = ref([]);
    const studioId = ref(route.params.studioId);
    const userId = ref(null);
    const { t: $t } = useI18n();

    const generateTimeSlots = () => {
      const slots = [];
      const start = new Date();
      start.setHours(10, 0, 0, 0);
      const end = new Date();
      end.setHours(19, 0, 0, 0);

      while (start < end) {
        slots.push({ time: start.toTimeString().slice(0, 5), isBooked: false });
        start.setMinutes(start.getMinutes() + 60);
      }

      return slots;
    };

    const fetchUserSession = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/users/session`,
          { withCredentials: true }
        );
        userId.value = response.data.userId;
      } catch (error) {
        console.error("Error fetching user session:", error);
        alert(this.$t("appointmentPage.errorFetchingSession"));
      }
    };

    const fetchAvailableAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/appointments/filter`,
          {
            params: {
              date: selectedDate.value,
              studioId: studioId.value,
            },
          }
        );

        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid response data:", response.data);
          timeSlots.value = generateTimeSlots();
          return;
        }

        const reservedSlots = response.data.map((appointment) => {
          return appointment.AppointmentTime.slice(0, 5);
        });

        timeSlots.value = generateTimeSlots().map((slot) => {
          const isBooked = reservedSlots.includes(slot.time);
          return {
            ...slot,
            isBooked,
          };
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
        timeSlots.value = generateTimeSlots();
      }
    };

    const bookAppointment = async (time) => {
  if (!userId.value) {
    alert($t("appointmentPage.loginToBook"));
    return;
  }

  try {
    const payload = {
      appointmentDate: selectedDate.value,
      appointmentTime: time,
      studioId: studioId.value,
      userId: userId.value,
    };

    await axios.post(`${process.env.API_URL}/api/appointments`, payload, {
      withCredentials: true,
    });

    alert($t("appointmentPage.appointmentSuccess"));

    const updatedSlots = timeSlots.value.map((slot) =>
      slot.time === time ? { ...slot, isBooked: true } : slot
    );
    timeSlots.value = updatedSlots;
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert(
      error.response?.data?.message || $t("appointmentPage.appointmentError")
    );
  }
};


    watch([selectedDate, studioId], () => {
      fetchAvailableAppointments();
    });

    onMounted(async () => {
      await fetchUserSession();
      timeSlots.value = generateTimeSlots();
      fetchAvailableAppointments();
    });

    return {
      selectedDate,
      timeSlots,
      fetchAvailableAppointments,
      bookAppointment,
      $t,
    };
  },
};
</script>

<style scoped>
.booking-page {
  background-color: var(--q-page-background-color);
  color: var(--q-page-text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--q-page-title-color);
}

.booking-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.date-picker {
  max-width: 300px;
  flex: 1;
  height: 100%;
}

.time-slots-container {
  flex: 1;
  padding: 20px;
  background-color: var(--q-card-background-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 370px;
  margin-bottom: 100px;
}

.time-slots-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
}

.time-slot {
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-slot-btn {
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
}

.no-slots-message {
  font-size: 1.2rem;
  color: var(--q-text-secondary);
}

@media (max-width: 768px) {
  .booking-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .date-picker {
    width: 100%;
    max-width: 100%;
    margin-bottom: 15px;
  }

  .time-slots-container {
    width: 100%;
    padding: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }

  .time-slots-title {
    font-size: 1.25rem;
    text-align: center;
  }

  .time-slots-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
  }

  .time-slot-btn {
    font-size: 0.8rem;
    padding: 8px;
  }
}
</style>
