const part1 = [ 'Товарищи,', 'С другой стороны', 'Равным образом', 'Не следует, однако, забывать, что', 'Таким образом,', 'Повседневная практика показывает, что', 'Уважаемые коллеги,', 'Позвольте Вам напомнить, что', 'Также как', 'В целом, конечно,' ];
const part2 = [ 'реализация намеченных плановых заданий', 'рамки и место обучения кадров', 'постоянный количественный рост и сфера нашей активности', 'сложившаяся структура организации', 'новая модель организационной деятельности', 'дальнейшее развитие различных форм деятельности', 'перспективное планирование', 'оптимизация основных целей ', 'экономическая повестка сегоднящнего дня', 'внедрение современных подходов' ];
const part3 = [ 'играет важную роль в формировании', 'требуют от нас анализа', 'требуют определения и уточнения', 'способствует подготовке и реализации', 'обеспечивает широкому кругу (специалистов) участие в формировании', 'позволяет выполнить важные задания по разработке', 'не дает нам иного выбора, кроме определения', 'вынуждает нас объективно потребовать', 'играет определяющее значение для', 'выявляет срочную потребность' ];
const part4 = [ 'существенных финансовых и административных условий.', 'дальнейших направлений развития.', 'системы массового участия.', 'позиций, занимаемых участниками в отношении поставленных задач.', 'новых предложений.', 'направлений прогрессивного развития.', 'стандартных подходов.', 'нестандартных решений.', 'экономических и неэкономических факторов и перспектив.', 'инновационных методов управления процессами.' ];
const names = [ 'Тимур', 'Арина', 'Ксения', 'Никита', 'Вероника', 'Виктор', 'Максим', 'Елизавета', 'Алексей', 'Станислав', 'София', 'Макар', 'Егор', 'Артём', 'Андрей', 'Григорий', 'Агния', 'Алиса', 'Кира', 'Арсений', 'Владислав', 'Михаил', 'Фёдор', 'Софья', 'Роман', 'Алина', 'Марк', 'Матвей', 'Вера', 'Иван' ];

function randInt(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function normalizeName(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {

    getRandomSingleSentence() {
        return `${part1[randInt(0, 9)]} ${part2[randInt(0, 9)]} ${part3[randInt(0, 9)]} ${part4[randInt(0, 9)]}`;
    },

    getRandomSentences(count) {
        let result = '';
        for (let i = 0; i < count; i++) {
            result += `${this.getRandomSingleSentence()} `;
        }
        return result;
    },

    getRandomName() {
        return names[randInt(0, 29)];
    },

    prepareFullName(name, secondName) {
        return `${normalizeName(name)} ${normalizeName(secondName)}`
    },

    getInitialsFromFullName(fullName) {
        return fullName.split(' ').map(item => item[0]).join('');
    },

    getFormattedTime(timeInMs) {
        return new Date(timeInMs).toLocaleString("ru",{
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: 'numeric',
            second: 'numeric'
        });

    }
};



