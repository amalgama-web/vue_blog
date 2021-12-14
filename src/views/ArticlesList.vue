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
                
                <articles-list-item v-for="article in articlesList"
                                    :article="article"
                                    @open-article="openArticle"
                                    @remove-article="removeArticle"
                                    :key="article.id"></articles-list-item>
                
                <li ref="additionalLoadingMarker"></li>
                <li class="article-additional-preloader" v-show="isAdditionalLoadingActive">
                    <div class="preloader"></div>
                </li>
                
            </ul>
            
            <articles-list-empty v-else></articles-list-empty>
            
        </div>
    </section>
</template>

<script>
    import { fakeApiService } from '../services/fakeApiService';
    import articlesListEmpty from '../components/articles-list-empty';
    import articlesListItem from '../components/articles-list-item';

    export default {
        components: {
            articlesListEmpty,
            articlesListItem
        },
        data() {
            return {
                isInitialDataLoaded: false,
                isAdditionalLoadingActive: false,
                articlesList: [],

                lastLoadedArticleIndex: 5,
                articlesTotalLength: null,
                observer: null
            }
        },

        methods: {
            openArticle(articleId) {
                this.$router.push({ name: 'Article', params: { id: articleId } });
            },

            removeArticle(articleId) {
                const indexForRemove = this.articlesList.findIndex(item => item.id === articleId );
                const articleForRemove = this.articlesList[indexForRemove];
                
                articleForRemove.isInProcessing = true;

                fakeApiService
                    .removeArticle(articleId)
                    .then(() => {
                        this.articlesList.splice(indexForRemove, 1);
                        this.lastLoadedArticleIndex -= 1;
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
                if (this.lastLoadedArticleIndex >= this.articlesTotalLength) {
                    this.destroyLoadingObserver();
                    return;
                }
                
                this.isAdditionalLoadingActive = true;
                fakeApiService.getArticlesList(this.lastLoadedArticleIndex + 1, this.lastLoadedArticleIndex + 5).then((response) => {
                    this.articlesList.push(...response.articles);
                    this.articlesTotalLength = response.length;
                    this.isAdditionalLoadingActive = false;
                    this.lastLoadedArticleIndex += 5;
                });
            },
        },
        created() {
            fakeApiService.getArticlesList(1, 5).then((response) => {
                this.articlesList = response.articles;
                this.articlesTotalLength = response.length;
                this.isInitialDataLoaded = true;
                
                if(response.length <= 5) return;
                
                this.$nextTick( () => {
                    this.createLoadingObserver();
                });
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
    
    .article-additional-preloader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }
</style>