import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
const locales = {
  "ru-RU": ru,
  "en-US": en,
}
export default function (key) {
  const locale = store.getters.getUserInfo.locale || 'ru-RU';
  return locales[locale][key] || `error locale key : ${key}`
}