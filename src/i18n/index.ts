import { useI18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

import zh from './locale/zh'
import en from './locale/en'
import ru from './locale/ru'

export const LOCALSTORAGE_KEY_LOCALE = 'PPTIST_LOCALE'

function getSavedLocale() {
  return localStorage.getItem(LOCALSTORAGE_KEY_LOCALE)
}

let initialLocale = 'zh'
const saved = getSavedLocale()
if (saved === 'en' || saved === 'zh' || saved === 'ru') {
  initialLocale = saved
}
else if (navigator.language === 'zh-CN' || navigator.language.startsWith('zh')) {
  initialLocale = 'zh'
}
else if (navigator.language === 'ru-RU' || navigator.language.startsWith('ru')) {
  initialLocale = 'ru'
}
else {
  initialLocale = 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    zh,
    en,
    ru,
  },
  warnHtmlMessage: false,
})

export function useI18nExtended() {
  return useI18n()
}
