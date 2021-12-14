<template>
    <li class="article-item"
        :class="{'_element-processing': article.isInProcessing}"
        @click="$emit('open-article', article.id)">
        
        <div class="article-item__name">{{article.name}}</div>
        <div class="article-item__text">{{article.shortText}}</div>
        
        <div class="article-item__buttons">
            <div class="article-item__comment-count">Комментариев: {{ commentsCount }}</div>
            <router-link class="button _green _sm" :to="{ name: 'EditArticle', params: { id: article.id } }" @click.stop>
                Редактировать
            </router-link>
            <div class="button _red _sm" @click.stop="$emit('remove-article', article.id)">Удалить запись</div>
        </div>
    </li>
</template>

<script>
    import { commentsService } from "../services/commentsService";
    
    export default {
        props: ['article'],
        computed: {
            commentsCount() {
                return commentsService.countComments( this.article.commentList, 0 );
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