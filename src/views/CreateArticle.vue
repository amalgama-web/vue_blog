<template>
    <section class="l-container">
        
        <router-link to="/">
            <div class="button">← К списку статей</div>
        </router-link>
    
        <div class="article-created" v-if="isArticleCreated">
            <div class="create-article__head">Ваша статья опубликована</div>
            <p>Вы можете просмотреть ее и при необходимости отредактировать:</p>
            <router-link :to="{ name: 'Article', params: { id: newArticleId } }">
                <div class="button">Просмотреть статью</div>
            </router-link>
        </div>
        
        <div class="create-article" v-else>
            <div class="create-article__head">Создать новую запись</div>
            <form-edit-article @article-created="onArticleCreated"></form-edit-article>
        </div>
        
    </section>
</template>

<script>
    import FormEditArticle from '../components/form-edit-article'

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
            }
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
    .article-created {
        padding: 40px 0;
    }
</style>

