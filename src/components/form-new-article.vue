<template>
    <form class="form-new-article" action="">
        <div class="form-new-article__group">
            <div class="form-new-article__label">Заголовок статьи:</div>
            <input placeholder="Заголовок вашей статьи" type="text" v-model="articleName">
        </div>
        
        <div class="form-new-article__group">
            <div class="form-new-article__label">Текст превью:</div>
            <textarea placeholder="Превью" v-model="articleShort" name="" id="" cols="30" rows="10"></textarea>
        </div>
        
        <div class="form-new-article__group">
            <div class="form-new-article__label">Полный текст:</div>
            <textarea placeholder="Полный текст вашей статьи" v-model="articleFull" name="" id="" cols="30"
                      rows="10"></textarea>
        </div>
        
        <div class="form-new-article__group">
            <button class="button" @click.prevent="publishArticle">Создать статью</button>
        </div>
    </form>
</template>

<script>
    import { fakeApi } from '../fakeApi.js'

    export default {
        data() {
            return {
                articleName: '',
                articleShort: '',
                articleFull: '',
            }
        },

        methods: {
            publishArticle() {
                fakeApi.addArticle({
                    name: this.articleName,
                    shortText: this.articleShort,
                    fullText: this.articleFull
                });
            },
        },
    }
</script>

<style lang="less">
    .form-new-article {
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
</style>

