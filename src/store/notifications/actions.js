export default {
    show(context, {text, type = 'success', hideAfter = false}) {
        context.commit('setText', text);
        context.commit('setType', type);
        context.commit('show');

        if(!hideAfter) return;

        setTimeout(() => {
            context.commit('hide');
        }, hideAfter);
    },

    hide(context) {
        context.commit('hide');
    }
}
