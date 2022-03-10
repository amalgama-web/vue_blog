<template>
    <section>
        
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
    
        <div class="article-success" v-if="isArticleCreated">
            <div class="article-success__head">Ваша статья опубликована</div>
            <div class="article-success__buttons">
                <router-link class="button" :to="{ name: 'TheArticle', params: { id: newArticleId } }">
                    Просмотреть статью
                </router-link>
                <button class="button" @click="createAnother">Создать еще одну статью</button>
            </div>
        </div>
        
        <div class="create-article" v-else>
            <div class="create-article__head">Создать новую запись</div>
            <form-edit-article @article-created="onArticleCreated"></form-edit-article>
        </div>
        
    </section>
</template>

<script>
    import FormEditArticle from '../components/article/FormEditArticle'

    export default {
        components: {
            FormEditArticle
        },
        data() {
            return {
                isArticleCreated: false,
                newArticleId: null
            }
        },
        methods: {
            onArticleCreated(newArticleId) {
                this.newArticleId = newArticleId;
                this.isArticleCreated = true;
            },
            createAnother() {
                this.isArticleCreated = false;
            },
        }
    }
</script>

<style lang="less">
    .create-article {
        padding: 40px 0;
        
        &__head {
            font-size: 30px;
            margin-bottom: 30px;
        }
    }
    .article-success {
        padding: 40px 0;
        &__head {
            text-align: center;
            font-size: 25px;
            font-style: italic;
            color: mediumseagreen;
            margin-bottom: 30px;
        }
        &__buttons {
            text-align: center;
            & > * {
                margin: 0 20px;
            }
        }
    }
</style>

