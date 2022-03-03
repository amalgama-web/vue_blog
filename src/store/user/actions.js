import textService from "../../services/textService";
import createUrlService from "../../services/createUrlService";

export default {
    async signUp(context, payload) {

        const preparedFullName = textService.prepareFullName(payload.name, payload.secondName);
        const url = createUrlService.signUp;
        const data = {
            email: payload.email,
            password: payload.password,
            displayName: preparedFullName,
            returnSecureToken: true
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            if(!response.ok) {
                const errText = await response.text();
                const message = JSON.parse(errText).error.message;
                throw new Error(`Ошибка при регистрации: ${message}`);
            }

            const responseData = await response.json();
            context.dispatch('setUser', {
                id: responseData.localId,
                email: responseData.email,
                token: responseData.idToken,
                expire: responseData.expiresIn,
                fullName: preparedFullName
            });

            context.dispatch('notify/show', {
                text: 'Вы успешно зарегистрированы',
                hideAfter: 3000
            });

            return true;

        } catch (e) {

            context.dispatch('notify/show', {
                type: 'error',
                text: e.message
            });
            return false;

        }
    },

    async signIn(context, payload) {

        const url = createUrlService.signIn;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });

            if(!response.ok) {
                const errText = await response.text();
                const message = JSON.parse(errText).error.message;
                throw new Error(`Ошибка авторизации: ${message}`);
            }

            const responseData = await response.json();

            context.dispatch('setUser', {
                id: responseData.localId,
                email: responseData.email,
                token: responseData.idToken,
                expire: responseData.expiresIn,
                fullName: responseData.displayName
            });

            context.dispatch('notify/show', {
                text: 'Вы успешно авторизированы',
                hideAfter: 3000
            });

            return true;
        } catch (e) {
            context.dispatch('notify/show', {
                type: 'error',
                text: e.message
            });
            return false;
        }
    },

    setUserFromStorage(context) {
        const userData = JSON.parse( localStorage.getItem('userData') );

        console.log(userData);
        if (!userData) return;

        context.commit('setUser', userData);
        context.dispatch('preloadFavorites');
    },

    setUser(context, userData) {
        context.commit('setUser', userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        context.dispatch('preloadFavorites');
    },

    logout(context) {
        context.commit('logout');
        localStorage.removeItem('userData');
    }
}
