<template>
    <div>
        <transition name="tabs" mode="out-in">
            <div v-if="isDataLoading" class="preloader-wrap">
                <div class="preloader" ></div>
            </div>
            
            <div v-else-if="isError">
                Произошла ошибка загрузки статей
            </div>
    
            <ul v-else-if="articlesList.length"
                class="article-items"
            >
                <article-item v-for="article in articlesList"
                              :article="article"
                              :key="article.id"
                ></article-item>
            </ul>
            
            <div v-else>
                Вы не добавили в избранное ни одной статьи
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
            favoritesCount() {
                return this.$store.getters.favoritesCount;
            }
        },

        methods: {
            async loadFavoritesArticles() {

                this.isDataLoading = true;

                const promises = this.$store.getters.favoritesList.map(favoriteId => fetch(createUrlService.article(favoriteId)));
                
                Promise.all(promises)
                    .then(response => {
                        if( response.some(respItem => respItem.ok === false) ) {
                            throw new Error('Ошибка загрузки избранных статей');
                        }
                        return Promise.all(response.map(respItem => respItem.json()));
                    })
                    .then(responseData => {
                        this.articlesList = articleService.createUserFavoritesList(responseData, this.$store.getters.favoritesList);
                    })
                    .catch(e => {
                        this.$store.dispatch('notify/show', {
                            text: e.message,
                            type: 'error'
                        });
                        this.isError = true;
                    })
                    .finally(() => {
                        this.isDataLoading = false;
                    })
            }
        },
        
        watch: {
            favoritesCount(newVal, oldVal) {
                if(oldVal !== 0) return;
                this.loadFavoritesArticles();
            }
        },
        
        created() {
            if(this.favoritesCount) {
                this.loadFavoritesArticles()
            }
        }
    }
</script>

<style lang="less">
</style>

