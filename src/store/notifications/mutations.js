export default {
    setText(state, newText) {
        state.text = newText;
    },

    setType(state, newType) {
        state.type = newType
    },

    show(state) {
        state.isVisible = true
    },

    hide(state) {
        state.isVisible = false
    }
}