<template>
    <form class="form-new-article" action="">
        <div class="form-new-article__group">
            <div class="field-label">Заголовок статьи:</div>
            <input placeholder="Заголовок вашей статьи" type="text" v-model.trim="articleName">
        </div>
        
        <div class="form-new-article__group">
            <div class="field-label">Текст превью:</div>
            <textarea placeholder="Превью" v-model.trim="articleShort" name="" id="" cols="30" rows="10"></textarea>
        </div>
        
        <div class="form-new-article__group">
            <div class="field-label">Полный текст:</div>
            <textarea placeholder="Полный текст вашей статьи" v-model.trim="articleFull" name="" id="" cols="30"
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
            }
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
        
    }
</style>

