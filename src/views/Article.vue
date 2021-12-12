<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isDataLoaded">
            <div class="preloader"></div>
        </div>
        <div class="article-view" v-else>
            <div class="article-view__head">
                {{ currentArticle.name }}
            </div>
            <div class="article-view__body">
                {{ currentArticle.fullText }}
            </div>
            
            <div class="article-view__subhead">Комментарии:</div>
            <div class="comment-list">
                <div class="comment-list__empty" v-if="!currentArticle.commentList.length">Комментариев еще нет. Будьте первым</div>
                <div class="comment-item" v-for="comment in currentArticle.commentList" :key="comment.id">
                    <div class="comment-item__name">{{ comment.userName }}</div>
                    <div class="comment-item__text">{{ comment.text }}</div>
                    <div class="button _sm _red" @click="removeComment(comment.id)">Удалить комментарий</div>
                </div>
            </div>
            
            <div class="button" @click="openCommentForm" v-show="!isCommentFormOpen">Добавить комментарий</div>
            <form-new-comment v-show="isCommentFormOpen"
                              @comment-created="pushComment"
                              :article-id="currentArticle.id"></form-new-comment>
        </div>
        
    </div>
</template>

<script>
    import { fakeApi } from '../fakeApi.js';
    import FormNewComment from '../components/form-new-comment';
    
    export default {
        components: {
            FormNewComment
        },
        data() {
            return {
                currentArticle: null,
                isDataLoaded: false,
                isCommentFormOpen: false,
            }
        },

        methods: {
            openCommentForm() {
                this.isCommentFormOpen = true;
            },
            
            pushComment(newComment) {
                this.currentArticle.commentList.push(newComment);
                this.isCommentFormOpen = false;
            },
            
            removeComment(commentID) {
                fakeApi.removeComment(commentID, this.currentArticle.id);

                let indexToRemove = this.currentArticle.commentList.findIndex(item => item.id === commentID );
                this.currentArticle.commentList.splice(indexToRemove, 1);
            }
        },
        
        created() {
            
            fakeApi.getArticleByID(this.$route.params.id).then((response) => {
                this.currentArticle = response;
                this.isDataLoaded = true;
            });
            
            
        }
    }
</script>

<style lang="less">
    .article-view {
        padding: 40px 0;
        &__head {
            font-size: 30px;
            margin-bottom: 20px;
        }
        
        &__body {
            margin-bottom: 50px;
        }
        
        &__subhead {
            font-size: 20px;
            margin-bottom: 10px;
        }
        
    }

    .comment-list {
        margin-bottom: 40px;
    
        &__empty {
            font-size: 13px;
            color: #999;
            font-style: italic;
        }
    }

    .comment-item {
        font-size: 13px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
    
        &__name {
            font-weight: bold;
            margin-bottom: 10px;
        }
    
        &__text {
            margin-bottom: 10px;
        }
    
        & + .comment-item {
            margin-top: 15px;
        }
    }
</style>