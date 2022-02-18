<template>
    <div v-show="isVisible"
         :class="typeClass"
         class="base-notification"
    >
        <div class="base-notification__text">
            {{ text }}
        </div>
        <button class="base-notification__close" @click="close">×</button>
    </div>
    
</template>

<script>
    export default {
        props: {
            text: String,
            type: String,
            isVisible: Boolean,
        },
        components: {
        },
        data() {
            return {
            }
        },
        computed: {
            typeClass() {
                return `_${this.type}`
            }
        },
        methods: {
            close() {
                this.$emit('hide-notification');
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
        

        &._error {
            background-color: orangered;
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
            
        }
    }
</style>