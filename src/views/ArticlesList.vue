<template>
    <section class="l-container">
        
        <div class="article-list" v-cloak>
            
            <div class="opposite-header">
                <div class="article-list__head">Список статей</div>
                <router-link to="/create" class="button">
                    Добавить статью
                </router-link>
            </div>
            
            <div class="preloader-wrap" v-if="!isDataLoaded">
                <div class="preloader" ></div>
            </div>
            
            <ul class="article-items" v-else-if="articleList.length">
                <li class="article-item"
                     v-for="article in articleList"
                     :key="article.id"
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
    import { fakeApi } from '../fakeApi.js'
    export default {
        data() {
            return {
                isDataLoaded: false,
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
            fakeApi.getArticles().then((response) => {
                this.articleList = response;
                this.isDataLoaded = true;
            });
        }
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
            font-size: 12px;
            line-height: 17px;
            margin-bottom: 20px;
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
</style>