<template>
    
    <base-notification :text="notificationMessage"
                       :type="notificationType"
                       :is-visible="notificationVisible"
                       @hide-notification="hideNotification"
    ></base-notification>
    
    <div class="page-preloader" v-if="isPageloaderVisible">
        <div class="preloader"></div>
    </div>
    
    <the-header></the-header>
    
    <router-view></router-view>

</template>

<script>
    import BaseNotification from './components/BaseNotification';
    import TheHeader from './components/TheHeader';

    export default {
        components: {
            BaseNotification,
            TheHeader
        },
        provide() {
            return {
                showPageloader: this.showPageloader,
                hidePageloader: this.hidePageloader,
                
                showNotification: this.showNotification,
            }
        },
        data() {
            return {
                isPageloaderVisible: false,
                
                notificationMessage: '',
                notificationVisible: false,
                notificationType: ''
            }
        },
        computed: {
        
        },
        methods: {
            showPageloader() {
                this.isPageloaderVisible = true;
            },
            
            hidePageloader() {
                this.isPageloaderVisible = false;
            },
            
            showNotification(text, type) {
                this.notificationVisible = true;
                this.notificationMessage = text;
                this.notificationType = type;
            },
            
            hideNotification() {
                this.notificationVisible = false;
            },
            
            
        },
        
        created() {
            this.$store.dispatch('setUserFromStorage');
        }
    }
</script>

<style lang="less">
    * {
        box-sizing: border-box;
    }
    ul, li {
        margin: 0;
        padding: 0;
    }
    ul {
        list-style-type: none;
    }
    .placeholder-color(@color) {
        &::-webkit-input-placeholder {
            color: @color;
        }
        &:-moz-placeholder {
            color: @color;
        }
        &::-moz-placeholder {
            color: @color;
            opacity: 1;
        }
        &:-ms-input-placeholder {
            color: @color;
        }
    }
    
    body {
        background-color: #fff;
        margin: 0;
        padding: 0;
        color: #2d2d2d;
        font: 14px/1.6 Verdana, serif;
    }
    
    [v-cloak] {
        display: none;
    }

    input[type="text"],
    input[type="password"] {
        height: 40px;
    }
    input[type="text"],
    input[type="password"],
    textarea {
        border: 1px solid #ccc;
        outline: none !important;
        display: block;
        width: 100%;
        padding: 0 10px;
        border-radius: 4px;
        
        font: inherit;
        
        
        transition: all linear 150ms;
        .placeholder-color(#aaa);
        
        &:focus {
            border-color: darken(#ccc, 10%);
        }
    }
    
    textarea {
        padding: 10px;
        resize: none;
        height: 200px;
    }
    
    input {
    
    }
    
    a {
        text-decoration: none;
        &:link {color: cornflowerblue;}
        &:visited {color: cornflowerblue;}
        &:hover {color: darken(cornflowerblue, 10%);}
        &:active {color: cornflowerblue;}
    }
    
    .l-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    
    .header {
        position: sticky;
        z-index: 10;
        top: 0;
        background-color: #eee;
        box-shadow: 0 0 20px 0 rgba(0,0,0,.3);
        &__inner {
            display: flex;
            justify-content: space-between;
            
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        &__title {
            text-align: center;
            font-size: 25px;
        }
        &__user-info {
            display: inline-flex;
            align-items: center;
        }
        
    }
    .user-plate {
        &__icon {
            display: inline-block;
            @square: 40px;
            height: @square;
            width: @square;
            line-height: @square;
            text-align: center;
            background-color: #2d2d2d;
            color: #cccccc;
            font-size: 20px;
            text-transform: uppercase;
        
            border-radius: 50%;
        }
        &__name {
        
        }
    }
    
    .error-message {
        font-size: 12px;
        font-style: italic;
        color: orangered;
    }
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        
        height: 50px;
        
        padding: 10px 20px;
        
        border-radius: 4px;
        border: none;
        outline: none;
        
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: #fff;
        &:link {color: #fff;}
        &:visited {color: #fff;}
        &:hover {color: #fff;}
        &:active {color: #fff;}
        
        transition: all linear 150ms;
    
        background-color: cornflowerblue;
        &:hover { background-color: lighten(cornflowerblue, 5%); }
        &:active { background-color: cornflowerblue; }
        
        cursor: pointer;
        
        &._red {
            background-color: firebrick;
            &:hover { background-color: lighten(firebrick, 5%); }
            &:active { background-color: firebrick; }
        }
        
        &._green {
            background-color: mediumseagreen;
            &:hover { background-color: lighten(mediumseagreen, 5%); }
            &:active { background-color: mediumseagreen; }
        }
    
        &._orange {
            background-color: orange;
            &:hover { background-color: lighten(orange, 5%); }
            &:active { background-color: orange; }
        }
        
        &._sm {
            height: 30px;
            padding: 5px 13px;
            font-size: 12px;
        }
        
        &__icon {
            &._active {
                color: orangered;
            }
        }
    }
    
    .opposite-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
    }
    
    .field-label {
        margin-bottom: 5px;
        font-size: 12px;
        color: #666;
        font-style: italic;
    }
    
    .preloader-wrap {
        display: flex;
        min-height: 400px;
        justify-content: center;
        align-items: center;
        max-width: 500px;
        margin: 0 auto;
    }
    .preloader {
        display: block;
        width: 60px;
        height: 15px;
        background: url('~@/assets/preloader.svg') no-repeat center bottom;
        background-size: contain;
        &._sm {
            width: 30px;
            height: 10px;
        }
        &._inline {
            display: inline-block;
        }
    }
    
    .page-preloader {
        display: flex;
        justify-content: center;
        align-items: center;
        
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: fade(#fff, 50%);
    }

    ._element-processing {
        &:before {
            position: absolute;
            z-index: 1;
            content: '';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: fade(#fff, 50%);
        }
    
        &:after {
            position: absolute;
            z-index: 2;
            content: '';
            display: block;
            width: 60px;
            height: 15px;
            left: 50%;
            top: 50%;
            margin: -7px 0 0 -30px;
            background: url('~@/assets/preloader.svg') no-repeat center bottom;
            background-size: contain;
        }
    }

</style>