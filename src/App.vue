<template>
    
    <header class="l-container header">
        <div class="header__title">Личный блог</div>
    </header>
    
    <router-view></router-view>

</template>

<script>

    export default {
        components: {
        },
        data() {
        },
        methods: {},
        mounted() {
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
    
    input,
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
    }
    
    input {
        height: 40px;
    }
    
    a {
        text-decoration: none;
    }
    
    .l-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        
    }
    
    .header {
        background-color: #eee;
        padding-top: 40px;
        padding-bottom: 40px;
        
        &__title {
            text-align: center;
            font-size: 30px;
            font-weight: 700;
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
        
        &._sm {
            height: 30px;
            padding: 5px 13px;
            font-size: 12px;
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
        margin: 30px auto;
        background: url('~@/assets/preloader.svg') no-repeat center bottom;
        background-size: contain;
    }

    ._form-processing {
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