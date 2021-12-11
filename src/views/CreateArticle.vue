<template>
    <section class="l-container">
        <router-link to="/">
            <div class="button">← К списку статей</div>
        </router-link>
        <div class="create-article">
            <div class="create-article__head">Создать новую запись</div>
            
            <div class="create-article__group">
                <div class="create-article__label">Заголовок статьи:</div>
                <input placeholder="Заголовок вашей статьи" type="text" v-model="articleName">
            </div>
            
            <div class="create-article__group">
                <div class="create-article__label">Текст превью:</div>
                <textarea placeholder="Превью" v-model="articleShort" name="" id="" cols="30" rows="10"></textarea>
            </div>
            
            <div class="create-article__group">
                <div class="create-article__label">Полный текст:</div>
                <textarea placeholder="Полное текст вашей статьи" v-model="articleFull" name="" id="" cols="30" rows="10"></textarea>
            </div>
            
            <div class="create-article__group">
                <div class="button" @click="publishArticle">Создать</div>
            </div>
        </div>
    </section>
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
        mounted() {
        }
    }
</script>