<template>
    <li class="article-item"
        :class="{'_element-processing': article.isInProcessing}"
        @click="$emit('open-article', article.id)">
        
        <div class="article-item__name">{{article.name}}</div>
        <div class="article-item__text">{{article.shortText}}</div>
        
        <div class="article-item__info">
            <div>
                Создано: <strong>{{ timeCreated }}</strong>
            </div>
            <div>
                Комментариев: <strong>{{ commentsCount }}</strong>
            </div>
        </div>
        <div class="article-item__info">
            
            <div class="button _orange _sm"
                 @click.stop="toggleFavorite(article.id)">
                
                <span v-if="isInFavorites(article.id)">
                    <span class="button__icon _active">❤</span>&nbsp;В избранном
                </span>
                
                <span v-else>
                    <span class="button__icon">❤</span>&nbsp;В избранное
                </span>
                
            </div>
            
            <router-link class="button _green _sm"
                         :to="{ name: 'EditArticle', params: { id: article.id } }"
                         @click.stop>
                Редактировать
            </router-link>
            
            <div class="button _red _sm" @click.stop="$emit('remove-article', article.id)">Удалить запись</div>
        </div>
    </li>
</template>

<script>
    import commentsService from "../services/commentsService";
    
    export default {
        props: ['article'],
        computed: {
            commentsCount() {
                return commentsService.countComments( this.article.commentList, 0 );
            },
            timeCreated() {
                return new Date(this.article.timeCreated).toLocaleString("ru", {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: 'numeric',
                    second: 'numeric'
                });
            }
        },
        methods: {
            toggleFavorite(articleId) {
                this.$store.dispatch('toggleArticleInFavorites', articleId);
            },
            
            isInFavorites(articleId) {
                return this.$store.state.favorites.some(favoriteId => favoriteId === articleId);
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
        
        &__info {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            & > * {
                margin-right: 20px;
            }
            strong {
                font-weight: 700;
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