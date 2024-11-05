import { createI18n } from "vue-i18n";
import messagesEn from "src/i18n/en.js";
import messagesHr from "src/i18n/hr.js";

const i18n = createI18n({
locale: "hr", // default locale
fallbackLocale: "hr", // fallback if the chosen language is not available
messages: {
en: messagesEn,
hr: messagesHr,
},
});

export default i18n;
