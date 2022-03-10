<template>
    <section>
        
        <div class="article-list" v-cloak>
            
            <div class="opposite-header">
                <div class="article-list__head">Добро пожаловать</div>
                <router-link to="/create" class="button">
                    Добавить статью
                </router-link>
            </div>
            
            <div class="preloader-wrap" v-if="!isInitialArticlesLoaded">
                <div class="preloader" ></div>
            </div>
            
            <div v-else-if="articlesList.length">
                <transition-group tag="ul" name="list" class="article-items">
                    <article-item v-for="article in articlesList"
                                  :article="article"
                                  :key="article.id"
                    ></article-item>
                </transition-group>
                
                <div ref="additionalLoadingMarker"></div>
                
                <div class="article-items__info" v-if="isAllArticlesLoaded">Все статьи загружены</div>
                
                <div class="article-items__preloader" v-show="isAdditionalLoadingActive">
                    <div class="preloader"></div>
                </div>
                
            </div>
            
            <article-list-empty v-else></article-list-empty>
            
        </div>
    </section>
</template>

<script>
    import articleService from '../services/articleService';
    import createUrlService from '../services/createUrlService';
    import ArticleListEmpty from '../components/articles-list/ArticleListEmpty';
    import ArticleItem from '../components/articles-list/ArticleItem';

    let observer = null;
    
    export default {
        components: {
            ArticleListEmpty,
            ArticleItem
        },
        data() {
            return {
                isInitialArticlesLoaded: false,
                isAdditionalLoadingActive: false,
                isAllArticlesLoaded: false,
                articlesList: [],

                loadingArticlesNumber: 5,
                
                lastArticleCreatedTime: null
            }
        },

        methods: {
            // removeArticle(articleId) {
            //     const indexForRemove = this.articlesList.findIndex(item => item.id === articleId );
            //     const url = createUrlService.article(articleId, this.$store.getters.token);
            //
            //     fetch(url, {
            //             method: 'DELETE'
            //         })
            //         .then(() => {
            //             this.articlesList.splice(indexForRemove, 1);
            //         })
            // },
            
            createLoadingObserver() {
                if( !this.$refs.additionalLoadingMarker ) return;

                observer = new IntersectionObserver( (entries) => {
                    if(entries[0].intersectionRatio !== 1) return;
                    this.additionalLoading();
                }, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1
                });
                observer.observe(this.$refs.additionalLoadingMarker);
            },
            
            destroyLoadingObserver() {
                observer.disconnect();
                observer = null;
            },
            
            stopAdditionalLoading() {
                this.destroyLoadingObserver();
                this.isAllArticlesLoaded = true;
            },
            
            additionalLoading() {
                this.isAdditionalLoadingActive = true;
                
                const url = createUrlService.listOfAdditionalArticles(this.lastArticleCreatedTime - 1, this.loadingArticlesNumber);

                fetch(url)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        if (responseData === null) {
                            this.stopAdditionalLoading();
                            return;
                        }
                        
                        const additionalList = articleService.createArticlesListFromObj(responseData);
                        
                        this.articlesList.push( ... additionalList);
                        
                        this.lastArticleCreatedTime = this.articlesList[this.articlesList.length - 1].timeCreated;
                        
                        if(additionalList.length < this.loadingArticlesNumber) {
                            this.stopAdditionalLoading();
                        }
                    })
                    .finally(() => {
                        this.isAdditionalLoadingActive = false;
                    });
            },
            
            initialLoading() {
                const url = createUrlService.listOfFirstArticles(this.loadingArticlesNumber);

                fetch(url)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        if (responseData === null) return;

                        this.articlesList = articleService.createArticlesListFromObj(responseData);
                        this.lastArticleCreatedTime = this.articlesList[this.articlesList.length - 1].timeCreated;
                        this.isInitialArticlesLoaded = true;

                        this.$nextTick( () => {
                            this.createLoadingObserver();
                        });
                    })
                    .finally(() => {
                        this.isInitialArticlesLoaded = true;
                    });
            }
        },
        created() {
            this.initialLoading();
        }
    }

</script>

<style lang="less">
    
    .article-list {
        &__head {
            font-size: 30px;
        }
    }
    
    .article-items {
        &__info {
            margin: 20px auto;
            text-align: center;
            color: #aaa;
            font-size: 16px;
            font-style: italic;
        }
        &__preloader {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
        }
    }

    .list-enter-from {
        background-color: darken(#f5f5f5, 10%);
    }
    .list-enter-to {
        background-color: #f5f5f5;
    }
    .list-enter-active {
        transition: all 1500ms ease-in;
    }

    .list-leave-from {}
    .list-leave-to {}
    .list-leave-active {}
</style>