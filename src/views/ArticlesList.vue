<template>
    <section class="l-container">
        
        <div class="article-list" v-cloak>
            
            <div class="opposite-header">
                <div class="article-list__head">Список статей</div>
                <router-link to="/create" class="button">
                    Добавить статью
                </router-link>
            </div>
            
            <div class="preloader-wrap" v-if="!isInitialDataLoaded">
                <div class="preloader" ></div>
            </div>
            
            <ul class="article-items" v-else-if="articlesList.length">
                
                <article-item v-for="article in articlesList"
                                    :article="article"
                                    @open-article="openArticle"
                                    @remove-article="removeArticle"
                                    :key="article.id"></article-item>
                
                <li ref="additionalLoadingMarker"></li>
                <li class="article-items__info" v-if="isAllArticlesLoaded">Все статьи загружены</li>
                <li class="article-items__preloader" v-show="isAdditionalLoadingActive">
                    <div class="preloader"></div>
                </li>
                
            </ul>
            
            <article-list-empty v-else></article-list-empty>
            
        </div>
    </section>
</template>

<script>
    import fakeApiService from '../services/fakeApiService';
    import articleService from '../services/articleService';
    import ArticleListEmpty from '../components/ArticleListEmpty';
    import ArticleItem from '../components/ArticleItem';

    export default {
        components: {
            ArticleListEmpty,
            ArticleItem
        },
        data() {
            return {
                isInitialDataLoaded: false,
                isAdditionalLoadingActive: false,
                isAllArticlesLoaded: false,
                articlesList: [],

                // todo обсервер вынести за реактивность
                observer: null,
                loadingArticlesAmount: 5,
                
                lastArticleCreatedTime: null
            }
        },

        methods: {
            openArticle(articleId) {
                this.$router.push({ name: 'TheArticle', params: { id: articleId } });
            },

            removeArticle(articleId) {
                const indexForRemove = this.articlesList.findIndex(item => item.id === articleId );
                const articleForRemove = this.articlesList[indexForRemove];
                
                articleForRemove.isInProcessing = true;

                fakeApiService
                    .removeArticle(articleId)
                    .then(() => {
                        this.articlesList.splice(indexForRemove, 1);
                    });
            },
            
            createLoadingObserver() {
                if( !this.$refs.additionalLoadingMarker ) return;

                this.observer = new IntersectionObserver( (entries) => {
                    if(entries[0].intersectionRatio !== 1) return;
                    this.additionalLoading();
                }, {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1
                });
                this.observer.observe(this.$refs.additionalLoadingMarker);
            },
            
            destroyLoadingObserver() {
                this.observer.disconnect();
                this.observer = null;
            },
            
            additionalLoading() {
                this.isAdditionalLoadingActive = true;

                fetch(`https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/articles.json?orderBy="timeCreated"&endAt=${this.lastArticleCreatedTime - 1}&limitToLast=${this.loadingArticlesAmount}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        if (responseData === null) {
                            this.destroyLoadingObserver();
                            this.isAllArticlesLoaded = true;
                            return;
                        }
                        this.articlesList.push( ...articleService.prepareArticlesList(responseData) );
                        this.lastArticleCreatedTime = this.articlesList[this.articlesList.length - 1].timeCreated;
                    })
                    .finally(() => {
                        this.isAdditionalLoadingActive = false;
                    });
            },
        },
        created() {

            fetch(`https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/articles.json?orderBy="timeCreated"&limitToLast=${this.loadingArticlesAmount}`)
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    if (responseData === null) return;
                    
                    this.articlesList = articleService.prepareArticlesList(responseData);
                    this.lastArticleCreatedTime = this.articlesList[this.articlesList.length - 1].timeCreated;
                    this.isInitialDataLoaded = true;

                    this.$nextTick( () => {
                        this.createLoadingObserver();
                    });
                })
                .finally(() => {
                });
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
</style>