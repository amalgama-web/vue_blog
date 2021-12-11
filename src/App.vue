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
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="less">
    .link-color(@color, @color-hover) {
        &:focus {color: @color;}
        &:link {color: @color;}
        &:visited {color: @color;}
        &:hover {color: @color-hover;}
        &:active {color: @color;}
    }
    .link-color(@color) {
        &:focus {color: @color;}
        &:link {color: @color;}
        &:visited {color: @color;}
        &:hover {color: @color;}
        &:active {color: @color;}
    }
    .transited() {
        transition: all 100ms linear 0ms;
    }
    
    .text-trim(@rows, @lineHeight) {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: @rows;
        -webkit-box-orient: vertical;
        max-height: @rows * @lineHeight;
    }
    .placeholder-color(@color) {
        &::-webkit-input-placeholder { color: @color; }
        &:-moz-placeholder { color: @color; }
        &::-moz-placeholder { color: @color; opacity: 1; }
        &:-ms-input-placeholder { color: @color; }
    }

    @color-text: #2d2d2d;
    body {
        background-color: #fff;
        margin: 0;
        padding: 0;
        color: @color-text;
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
        
    
        .transited();
    
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

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    
        height: 30px;
        background-color: cornflowerblue;
        padding: 10px 20px;
    
        border-radius: 4px;
    
        color: #fff;
    
        .transited();
    
        &:hover {
            background-color: lighten(cornflowerblue, 5%);
        }
    
        cursor: pointer;
    
        &._red {
            background-color: firebrick;
            &:hover {
                background-color: lighten(firebrick, 5%);
            }
        }
        &._green {
            background-color: mediumseagreen;
            &:hover {
                background-color: lighten(mediumseagreen, 5%);
            }
        }
        &._sm {
            height: 20px;
            padding: 5px 13px;
            font-size: 12px;
        }
    }

    .opposite-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }
    .article-list {
        &__head {
            font-size: 30px;
            margin-bottom: 30px;
        }
    }

    .article-item {
        display: block;
        margin-bottom: 20px;
        padding: 20px;
        background-color: #f5f5f5;
        color: @color-text;
        .link-color(@color-text);
        border-radius: 5px;
    
        cursor: pointer;
        .transited();
        &__name {
            margin-bottom: 5px;
        
            font-size: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &__text {
            font-size: 12px;
            line-height: 17px;
            .text-trim(2, 17px);
        
            margin-bottom: 20px;
        }
        &__buttons {
            display: flex;
            align-items: center;
            & > * {
                margin-right: 20px;
            }
        }
    
    
        &:hover {
            background-color: darken(#f5f5f5, 2%);
            .article-item__name {
                color: #3676e8;
            }
        }
    
    }
    .create-article {
        padding: 40px 0;
        max-width: 500px;
        &__head {
            font-size: 30px;
            margin-bottom: 30px;
        }
        &__group {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &__label {
            margin-bottom: 5px;
        
            font-size: 12px;
            color: #666;
            font-style: italic;
        }
    }
    .article-view {
        &__head {
            font-size: 30px;
            margin-bottom: 20px;
        }
        &__body {
            margin-bottom: 50px;
        }
        &__subhead {
            font-size: 20px;
            margin-bottom: 10px;
        }
    
    }

    .comment-form {
        max-width: 400px;
        &__label {
            margin-bottom: 5px;
        
            font-size: 12px;
            color: #666;
            font-style: italic;
        }
        &__group {
            margin-bottom: 20px;
        }
    }

    .comment-list {
        margin-bottom: 40px;
        &__empty {
            font-size: 13px;
            color: #999;
            font-style: italic;
        }
    }
    .comment-item {
        font-size: 13px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        &__name {
            font-weight: bold;
            margin-bottom: 10px;
        }
        &__text {
            margin-bottom: 10px;
        }
        & + .comment-item {
            margin-top: 15px;
        }
    }
</style>