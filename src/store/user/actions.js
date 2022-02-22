import textService from "../../services/textService";
import createUrlService from "../../services/createUrlService";

export default {
    signUp(context, payload) {

        const preparedFullName = textService.prepareFullName(payload.name, payload.secondName);
        const url = createUrlService.signUp;
        const data = {
            email: payload.email,
            password: payload.password,
            displayName: preparedFullName,
            returnSecureToken: true
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                context.dispatch('setUser', {
                    id: responseData.localId,
                    email: responseData.email,
                    token: responseData.idToken,
                    expire: responseData.expiresIn,
                    fullName: preparedFullName
                });
            })
            .catch(() => {

            });
    },

    signIn(context, payload) {

        const url = createUrlService.signIn;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                context.dispatch('setUser', {
                    id: responseData.localId,
                    email: responseData.email,
                    token: responseData.idToken,
                    expire: responseData.expiresIn,
                    fullName: responseData.displayName
                });
            });
    },

    setUserFromStorage(context) {
        const userData = JSON.parse( localStorage.getItem('userData') );

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
