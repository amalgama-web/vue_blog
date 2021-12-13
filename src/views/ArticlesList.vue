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
            
            <ul class="article-items" v-else-if="articleList.length">
                <li class="article-item"
                     v-for="article in articleList"
                     :key="article.id"
                     :class="{'_element-processing': article.isInProcessing}"
                     @click="openArticle(article.id)">
                    
                    <div class="article-item__name">{{article.name}}</div>
                    <div class="article-item__text">{{article.shortText}}</div>
        
                    <div class="article-item__buttons">
                        <div class="article-item__comment-count">Комментариев: {{article.commentList.length}}</div>
                        <router-link class="button _green _sm" :to="{ name: 'EditArticle', params: { id: article.id } }" @click.stop>
                            Редактировать
                        </router-link>
                        <div class="button _red _sm" @click.stop="removeArticle(article.id)">Удалить запись</div>
                    </div>
                </li>
                
                <li ref="additionalLoadingMarker"></li>
                <li class="article-additional-preloader" v-show="isAdditionalLoadingActive">
                    <div class="preloader"></div>
                </li>
            </ul>
            
            <div class="article-list__empty" v-else>
                <p>
                    Вы еще не добавили ни одной статьи
                </p>
                <router-link to="/create" class="button">
                    Добавить статью
                </router-link>
            </div>
            
        </div>
    </section>
</template>

<script>
    import { fakeApi } from '../fakeApi.js';
    
    export default {
        data() {
            return {
                isInitialDataLoaded: false,
                isAdditionalLoadingActive: false,
                articleList: [],

                currentMaxIndex: 5,
                articlesTotalLength: null,
                observer: null
            }
        },

        methods: {
            openArticle(articleId) {
                this.$router.push({ name: 'Article', params: { id: articleId } });
            },

            removeArticle(articleId) {
                let indexForRemove = this.articleList.findIndex(item => item.id === articleId );
                let articleForRemove = this.articleList[indexForRemove];
                
                articleForRemove.isInProcessing = true;
                
                fakeApi.removeArticle(articleId).then(() => {
                    this.articleList.splice(indexForRemove, 1);
                    this.currentMaxIndex -= 1;
                });
            },
            
            startLoadingObserver() {
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
                if (this.currentMaxIndex >= this.articlesTotalLength) {
                    this.destroyLoadingObserver();
                    return;
                }
                
                this.isAdditionalLoadingActive = true;
                fakeApi.getArticlesList(this.currentMaxIndex + 1, this.currentMaxIndex + 5).then((response) => {
                    this.articleList.push(...response.articles);
                    this.articlesTotalLength = response.length;
                    this.isAdditionalLoadingActive = false;
                    this.currentMaxIndex += 5;
                });
            },
        },
        created() {
            fakeApi.getArticlesList(1, 5).then((response) => {
                this.articleList = response.articles;
                this.articlesTotalLength = response.length;
                this.isInitialDataLoaded = true;
                
                if(response.length <= 5) return;
                
                this.$nextTick( () => {
                    this.startLoadingObserver();
                });
            });
        },
    }

</script>

<style lang="less">
    
    .article-list {
        &__head {
            font-size: 30px;
        }
        &__empty {
            display: flex;
            flex-direction: column;
            min-height: 400px;
            justify-content: center;
            align-items: center;
            max-width: 500px;
            margin: 0 auto;
            font-style: italic;
            
            font-size: 20px;
            color: #bbb;
        }
    }
    
    .article-item {
        display: block;
        position: relative;
        margin-bottom: 20px;
        padding: 20px;
        background-color: #f5f5f5;
        color: #2d2d2d;
        &:link {color: #2d2d2d;}
        &:visited {color: #2d2d2d;}
        &:hover {color: #2d2d2d;}
        &:active {color: #2d2d2d;}
        border-radius: 5px;
        
        cursor: pointer;
        transition: all linear 150ms;
    
        &__name {
            margin-bottom: 5px;
            
            font-size: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all linear 150ms;
        }
        
        
        &__text {
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 20px;
            
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
    
            max-height: 3 * 20px;
        }
        
        &__buttons {
            display: flex;
            align-items: center;
            
            & > * {
                margin-right: 20px;
            }
        }
        
        
        &:hover {
            background-color: darken(#f5f5f5, 2%);
            
            .article-item__name {
                color: #3676e8;
            }
        }
    }
    .article-additional-preloader {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }
</style>