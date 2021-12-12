<template>
    <section class="l-container">
    
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
    
        <div class="article-created" v-if="isArticleUpdated">
            <div class="create-article__head">Ваша статья отредактирована</div>
            <p>Изменения в статью внесены</p>
            <router-link class="button" :to="{ name: 'Article', params: { id: editedArticleId } }">
                Просмотреть статью
            </router-link>
        </div>
    
        <div class="create-article" v-else>
            <div class="create-article__head">Редактировать статью</div>
            <form-edit-article @article-created="onArticleUpdate"
                               :preload-article-id="editedArticleId">
            </form-edit-article>
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
                isArticleUpdated: false,
                editedArticleId: this.$route.params.id
            }
        },
        methods: {
            onArticleUpdate() {
                this.isArticleUpdated = true;
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

