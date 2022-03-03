import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";


import { defineRule, configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import { required, email, min, max } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

configure({
    generateMessage: localize('ru', {
        messages: {
            required() {
                return 'Это поле обязательно';
            },
            min(context) {
                return `Минимальное количество символов ${context.rule.params[0]}`;
            },
            email() {
                return `Некорректный E-mail адрес`;
            }
        },
    }),
});


setLocale('ru');

const app = createApp(App);

app.use(store)
    .use(router)
    .mount('#app');
