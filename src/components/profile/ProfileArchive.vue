<template>
    <div>
        <transition name="tabs" mode="out-in">
            <div v-if="isDataLoading" class="preloader-wrap">
                <div class="preloader" ></div>
            </div>
            
            <div v-else-if="isError">
                Произошла ошибка загрузки статей
            </div>
            
            
            <ul v-else-if="articlesList.length" class="article-items">
                <article-item v-for="article in articlesList"
                              :article="article"
                              :key="article.id"
                ></article-item>
            </ul>
            
            <div v-else>
                Архив статей пуст
            </div>
            
        </transition>
    </div>
</template>

<script>
    import articleService from "../../services/articleService";
    import createUrlService from "../../services/createUrlService";
    import ArticleItem from "../articles-list/ArticleItem";

    export default {
        components: {
            ArticleItem
        },

        data() {
            return {
                isDataLoading: false,
                isError: false,

                articlesList: []
            }
        },
        computed: {
        },

        methods: {
            async loadUserArticles() {

                this.isDataLoading = true;
                
                try {
                    const url = createUrlService.listOfUserArticles(this.$store.getters.userId);
                    
                    const response = await fetch(url);
                    
                    if(!response.ok) {
                        throw new Error('Ошибка загрузки данных');
                    }

                    const responseData = await response.json();
                    
                    if(!responseData) {
                        throw new Error('Ошибка загрузки данных');
                    }

                    this.articlesList = articleService.createUserArchivedArticlesList(responseData);
                    
                } catch (e) {

                    this.$store.dispatch('notify/show', {
                        text: e.message,
                        type: 'error'
                    });
                    
                    this.isError = true;
                    
                } finally {
                    
                    this.isDataLoading = false;
                    
                }
            }
        },

        created() {
            this.loadUserArticles();
        }
    }
</script>

<style lang="less">

</style>

