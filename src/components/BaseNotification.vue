<template>
    <transition>
        <div v-show="isVisible"
             :class="typeClass"
             class="base-notification"
        >
            <div class="base-notification__text">
                {{ text }}
            </div>
            <button class="base-notification__close" @click="close">×</button>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters({
                text: 'notify/text',
                type: 'notify/type',
                isVisible: 'notify/isVisible'
            }),
            typeClass() {
                return `_${this.type}`;
            }
        },
        methods: {
            close() {
                this.$store.dispatch('notify/hide');
            }
        },
        watch: {
        },

        created() {
        }
    }
</script>

<style lang="less">
    .base-notification {
        position: fixed;
        z-index: 100;
        top: 40px;
        left: 40px;
        width: 300px;
        padding: 15px 50px 15px 20px;

        border-radius: 4px;
        background-color: mediumseagreen;
        
        transition: all 200ms linear 0ms;
        

        &._error {
            background-color: orangered;
        }
        &._warning {
            background-color: orange;
        }
        
        &__text {
            font-size: 14px;
            color: #fff;
        }
        &__close {
            display: flex;
            align-items: center;
            justify-content: center;
            
            position: absolute;
            top: 50%;
            margin-top: -13px;
            right: 13px;
            
            width: 26px;
            height: 26px;
            background-color: rgba(0,0,0,.1);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: #fff;
            font-size: 25px;
            
            &:hover {
                background-color: rgba(0,0,0,.15);
            }
            &:active {
                background-color: rgba(0,0,0,.2);
            }
        }
        
        &.v-enter-from {
            transform: translateY(20px);
            opacity: 0;
        }
        &.v-enter-to {
            transform: translateY(0);
            opacity: 1;
        }
        &.v-enter-active {
    
        }
        &.v-leave-from {
            transform: translateX(0);
            opacity: 1;
        }
        &.v-leave-to {
            transform: translateY(-20px);
            opacity: 0;
        }
        &.v-leave-active {
        }
    }
</style>