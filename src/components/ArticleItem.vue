<template>
    <li class="article-item"
        :class="{'preloader-overlay': article.isInProcessing, '_archived': article.isArchived}"
        @click="openArticle(article.id)"
    >
        <div class="article-item__name">{{article.name}}</div>
        <div class="article-item__text">{{article.shortText}}</div>
        
        <div class="article-item__row">
            
            <div v-if="article.isArchived" class="article-item__archive-caption">В архиве</div>
            
            <p>
                Автор: <strong>{{ article.creatorFullName }}</strong>
            </p>
            <p>
                Создано: <strong>{{ timeCreated }}</strong>
            </p>
        </div>
    
        <div class="article-item__row">
        
            <button class="button _orange _sm"
                 @click.stop="toggleFavorite(article.id)"
            >
                
                <span v-if="isInFavorites(article.id)">
                    <span class="button__icon _active">❤</span>&nbsp;В избранном
                </span>
            
                <span v-else>
                    <span class="button__icon">❤</span>&nbsp;В избранное
                </span>
        
            </button>
        
            <router-link v-if="isCreator"
                         class="button _green _sm"
                         :to="{ name: 'EditArticle', params: { id: article.id } }"
                         @click.stop
            >
                Редактировать
            </router-link>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['article'],
        computed: {
            timeCreated() {
                return new Date(this.article.timeCreated).toLocaleString("ru", {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: 'numeric',
                    second: 'numeric'
                });
            },
            
            // todo заменить на mapGetters
            isAuth() {
                return this.$store.getters.isAuth;
            },

            isCreator() {
                return this.article.creatorId === this.$store.getters.userId;
            },
        },
        methods: {
            openArticle(articleId) {
                this.$router.push({ name: 'TheArticle', params: { id: articleId } });
            },
            
            toggleFavorite(articleId) {
                this.$store.dispatch('toggleArticleInFavorites', articleId);
            },
            
            isInFavorites(articleId) {
                return this.$store.getters.favoritesList.some(favoriteId => favoriteId === articleId);
            }
        }
    }
</script>

<style lang="less">
    
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
        
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            & > * {
                margin: 0 20px 0 0;
            }
            strong {
                font-weight: 700;
            }
        }
        &__archive-caption {
            background-color: #ffb997;
            display: inline-block;
            padding: 3px 10px 4px;
            border-radius: 3px;
        }
        
        &._archived {
            opacity: 0.7;
        }
        
        
        &:hover {
            background-color: darken(#f5f5f5, 2%);
            
            .article-item__name {
                color: #3676e8;
            }
        }
    }
</style>