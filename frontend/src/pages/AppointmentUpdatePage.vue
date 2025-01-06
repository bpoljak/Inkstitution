<template>
  <q-page
    class="appointments-update-page"
    :class="{ 'dark-mode': $q.dark.isActive, 'light-mode': !$q.dark.isActive }"
  >
    <div
      class="update-container"
      :class="{
        'card-dark': $q.dark.isActive,
        'card-light': !$q.dark.isActive,
      }"
    >
      <h2 class="update-title">{{ $t("updateAppointmentPage.title") }}</h2>
      <div class="appointment-info">
        <h3>{{ studioName }}</h3>
        <p>
          {{
            appointment.AppointmentDate
              ? new Date(appointment.AppointmentDate).toLocaleDateString(
                  "hr-HR"
                )
              : "N/A"
          }}
        </p>
      </div>
      <q-form @submit="updateAppointment">
        <q-input
          filled
          v-model="updatedDate"
          type="date"
          :label="$t('updateAppointmentPage.chooseDate')"
          class="update-input"
        />
        <q-select
          filled
          v-model="updatedTime"
          :options="timeOptions"
          :label="$t('updateAppointmentPage.chooseTime')"
          class="update-input"
        />
        <q-btn
          type="submit"
          color="primary"
          class="update-btn"
          :label="$t('updateAppointmentPage.updateButton')"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const appointment = ref({});
    const updatedDate = ref("");
    const updatedTime = ref("");
    const studioName = ref("N/A");
    const errorMessage = ref(null);
    const { t } = useI18n();

    const timeOptions = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
    ];

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toISOString().split("T")[0];
    };

    const fetchAppointment = async () => {
      const appointmentId = route.query.id;
      console.log(`appointmentId: ${appointmentId}`);
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/appointments/${appointmentId}`
        );
        appointment.value = response.data;

        studioName.value = response.data.StudioName || "N/A";
        updatedDate.value = formatDate(response.data.AppointmentDate);
        updatedTime.value = response.data.AppointmentTime;

        console.log("Fetched appointment:", response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        errorMessage.value = "Error loading appointment.";
      }
    };

    const updateAppointment = async () => {
      try {
        const [startTime] = updatedTime.value.split("-");
        await axios.put(
          `${process.env.API_URL}/api/appointments/${route.query.id}`,
          {
            appointmentDate: updatedDate.value,
            appointmentTime: startTime.trim(),
          }
        );

        $q.notify({
          color: "green",
          position: "top",
          message: t("updateAppointmentPage.notifications.success"),
          icon: "check_circle",
        });

        console.log("Appointment updated successfully.");
        router.push("/appointments");
      } catch (error) {
        console.error("Error updating appointment:", error);

        $q.notify({
          color: "red",
          position: "top",
          message: t("updateAppointmentPage.notifications.error"),
          icon: "error",
        });
        errorMessage.value = "Error updating appointment.";
      }
    };

    onMounted(fetchAppointment);

    return {
      appointment,
      updatedDate,
      updatedTime,
      studioName,
      timeOptions,
      errorMessage,
      updateAppointment,
    };
  },
};
</script>

<style scoped>
.appointments-update-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: var(--q-page);
}

.update-container {
  background-color: var(--q-surface);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
}

.update-title {
  text-align: center;
  font-size: 24px;
  color: var(--q-text-primary);
  margin-bottom: 20px;
}

.update-input {
  margin-bottom: 15px;
}

.update-btn {
  width: 100%;
  background-image: linear-gradient(to right, #ff512f, #dd2476);
  color: white;
  font-weight: bold;
}

.appointment-info {
  text-align: center;
  margin-bottom: 20px;
}

.appointment-info h3 {
  font-size: 20px;
  color: var(--q-text-primary);
}

.appointment-info p {
  font-size: 16px;
  color: var(--q-text-secondary);
}

.light-mode {
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
}

.dark-mode {
  background: linear-gradient(135deg, #232526, #414345);
}

.card-dark {
  background: rgb(24, 24, 24);
}

.card-light {
  background: white;
}

@media screen and (max-width: 768px) {
  .update-container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    max-width: 90%;
  }

  .update-title {
    font-size: 20px;
  }

  .update-input {
    margin-bottom: 10px;
  }

  .appointment-info h3 {
    font-size: 18px;
  }

  .appointment-info p {
    font-size: 14px;
  }

  .update-btn {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
