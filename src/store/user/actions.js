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
                expire: +responseData.expiresIn,
                fullName: preparedFullName
            });

            context.dispatch('notify/show', {
                text: 'Вы успешно зарегистрированы',
                hideAfter: 1500
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
                expire: +responseData.expiresIn,
                fullName: responseData.displayName
            });

            context.dispatch('notify/show', {
                text: 'Вы успешно авторизированы',
                hideAfter: 1500
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
        const expireTime = +localStorage.getItem('userDataExpireTime');

        if (!userData) return;

        if( new Date().getTime() > expireTime ) {
            context.dispatch('clearUserDataFromStorage');
            return;
        }

        context.commit('setUser', userData);
        context.commit('setUserExpireTime', expireTime);
        context.dispatch('preloadFavorites');
    },

    setUser(context, userData) {

        const expireTime = new Date().getTime() + userData.expire * 1000 - 300 * 1000;

        context.commit('setUser', userData);
        context.commit('setUserExpireTime', expireTime);

        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userDataExpireTime', expireTime);

        context.dispatch('preloadFavorites');
    },

    logout(context) {
        context.commit('logout');
        context.dispatch('clearFavorites');
        context.dispatch('clearUserDataFromStorage')
    },

    clearUserDataFromStorage() {
        localStorage.removeItem('userData');
        localStorage.removeItem('userDataExpireTime');
    },

    checkTokenIsExpired(context) {

        if( new Date().getTime() > context.getters.expireTime ) {
            context.dispatch('logout');
            return true;
        }

        return false;
    }
}
