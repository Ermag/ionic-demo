import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';

type MessageSchema = typeof en;

export const i18n = createI18n<[MessageSchema], 'en'>({
  legacy: false, // in order to use Composition API
  locale: 'en',
  messages: {
    en
  }
});
