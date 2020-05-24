import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const fallbackLng = ['en']
const availableLngs = ['en', 'es']
const options = {
  order: ['navigator', 'htmlTag', 'path', 'subdomain'],
  checkWhiteList: true
}

i18n
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng,
    debug: true,
    whitelist: availableLngs,
    detection: options,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      wait: true
    }
  })

export default i18n
