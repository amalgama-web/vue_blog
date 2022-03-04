import { defineRule, configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import { required, email, min, max } from '@vee-validate/rules';


export default function() {
    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('confirmed', (value, [target]) => {
        if (value === target) {
            return true;
        }
        return 'Пароль не совпадает';
    });

    configure({
        generateMessage: localize('ru', {
            messages: {
                required(context) {
                    console.log(context);
                    return `Поле "${context.field}" обязательно`;
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
}

