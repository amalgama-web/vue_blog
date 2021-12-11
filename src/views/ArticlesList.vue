<template>
    <section class="l-container">
        <div class="article-list" v-cloak>
            
            <div class="opposite-header">
                <div class="article-list__head">Список статей</div>
                <router-link to="/create">
                    <div class="button">Добавить статью</div>
                </router-link>
            </div>
            
            <div class="article-item" v-for="article in articleList" :key="article.id" @click="openArticle(article.id)">
                <div class="article-item__name">{{article.name}}</div>
                <div class="article-item__text">{{article.shortText}}</div>
                
                <div class="article-item__buttons">
                    <div class="article-item__comment-count">Комментариев: {{article.commentList.length}}</div>
                    <div class="button _green _sm" @click.stop>Редактировать</div>
                    <div class="button _red _sm" @click.stop="removeArticle(article.id)">Удалить запись</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { fakeApi } from '../fakeApi.js'
    export default {
        data() {
            return {
                articleList: [],
            }
        },

        methods: {
            openArticle(articleID) {
                this.$router.push({ name: 'Article', params: { id: articleID } });
            },

            removeArticle(articleID) {
                let indexToRemove = this.articleList.findIndex(item => item.id === articleID );
                
                fakeApi.removeArticle(articleID);
                
                this.articleList.splice(indexToRemove, 1);
            },
        },
        created() {
            this.articleList = fakeApi.getArticles();
        }
    }

</script>