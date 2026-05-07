import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "sensors": "Sensors",
      "crop_ai": "Crop AI",
      "irrigation": "Irrigation",
      "weather": "Weather",
      "market": "Market Prices",
      "expenses": "Expenses",
      "settings": "Settings",
      "system_commander": "SYSTEM COMMANDER",
      "operating_optimally": "operating optimally",
      "add_farm": "Add farm",
      "live_sensors": "Live sensors",
      "view_all": "View all",
      "ai_insights": "AI insights",
      "voice_listening": "Listening...",
      "voice_ready": "Voice Assistant Ready",
      "language": "Language"
    }
  },
  hi: {
    translation: {
      "dashboard": "डैशबोर्ड",
      "sensors": "सेंसर्स",
      "crop_ai": "फसल AI",
      "irrigation": "सिंचाई",
      "weather": "मौसम",
      "market": "बाजार भाव",
      "expenses": "खर्च",
      "settings": "सेटिंग्स",
      "system_commander": "सिस्टम कमांडर",
      "operating_optimally": "बेहतर काम कर रहे हैं",
      "add_farm": "खेत जोड़ें",
      "live_sensors": "लाइव सेंसर्स",
      "view_all": "सब देखें",
      "ai_insights": "AI सुझाव",
      "voice_listening": "सुन रहा हूँ...",
      "voice_ready": "वॉयस असिस्टेंट तैयार है",
      "language": "भाषा"
    }
  },
  kn: {
    translation: {
      "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "sensors": "ಸಂವೇದಕಗಳು",
      "crop_ai": "ಬೆಳೆ AI",
      "irrigation": "ನೀರಾವರಿ",
      "weather": "ಹವಾಮಾನ",
      "market": "ಮಾರುಕಟ್ಟೆ ದರ",
      "expenses": "ವೆಚ್ಚಗಳು",
      "settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      "system_commander": "ಸಿಸ್ಟಮ್ ಕಮಾಂಡರ್",
      "operating_optimally": "ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ",
      "add_farm": "ಹೊಸ ಜಮೀನು ಸೇರಿಸಿ",
      "live_sensors": "ಲೈವ್ ಸಂವೇದಕಗಳು",
      "view_all": "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
      "ai_insights": "AI ಒಳನೋಟಗಳು",
      "voice_listening": "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...",
      "voice_ready": "ಧ್ವನಿ ಸಹಾಯಕ ಸಿದ್ಧವಾಗಿದೆ",
      "language": "ಭಾಷೆ"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
