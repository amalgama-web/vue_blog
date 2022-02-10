<template>
    <section class="l-container">
    
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
    
        <div class="article-success" v-if="isArticleUpdated">
            <div class="article-success__head">Ваша статья отредактирована</div>
            <div class="article-success__buttons">
                <router-link class="button" :to="{ name: 'TheArticle', params: { id: editedArticleId } }">
                    Просмотреть статью
                </router-link>
            </div>
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
    import FormEditArticle from '../components/FormEditArticle'

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
</style>

