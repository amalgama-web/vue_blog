<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isDataLoaded">
            <div class="preloader"></div>
        </div>
        
        <div v-else>
            <div class="article-view" >
                <div class="article-view__head">
                    {{ currentArticle.name }}
                </div>
                <div class="article-view__body">
                    {{ currentArticle.fullText }}
                </div>
        
                <div class="article-view__buttons">
                    <router-link class="button _green"
                                 :to="{ name: 'EditArticle', params: { id: currentArticle.id } }"
                                 @click.stop>
                        Редактировать
                    </router-link>
                    <div class="button _red" @click="removeArticle(currentArticle.id)">Удалить статью</div>
                </div>
            </div>
    
            <div class="comments">
                <div class="comments__head">Комментарии:</div>
                <div class="comments__list">
                    <div class="comments__empty" v-if="!currentArticle.commentList.length">Комментариев еще нет. Будьте первым</div>
                    <div class="comment-item"
                         :class="{'_element-processing': comment.isInProcessing}"
                         v-for="comment in currentArticle.commentList"
                         :key="comment.id">
                        <div class="comment-item__name">{{ comment.userName }}</div>
                        <div class="comment-item__text">{{ comment.text }}</div>
                        <div class="button _sm _red" @click="removeComment(comment.id)">Удалить комментарий</div>
                    </div>
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
        inject: ['showPageloader', 'hidePageloader'],
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
            
            removeComment(commentId) {
                const indexForRemove = this.currentArticle.commentList.findIndex(item => item.id === commentId );
                const commentForRemove = this.currentArticle.commentList[indexForRemove];

                commentForRemove.isInProcessing = true;
                
                fakeApi.removeComment(commentId, this.currentArticle.id).then( () => {
                    this.currentArticle.commentList.splice(indexForRemove, 1);
                });
            },

            removeArticle(articleId) {
                this.showPageloader();
                fakeApi.removeArticle(articleId).then(() => {
                    this.hidePageloader();
                    this.$router.push({ name: 'Home' });
                });
            }
        },
        
        created() {
            fakeApi.getArticleById(this.$route.params.id).then((response) => {
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
            margin-bottom: 30px;
            line-height: 1.8;
        }
        &__buttons {
            & > * {
                margin-right: 30px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .comments {
        border-top: 1px solid #ccc;
        padding: 30px 0;
        &__head {
            font-size: 20px;
            margin-bottom: 10px;
        }
        &__list {
        }
        &__empty {
            color: #aaa;
            font-style: italic;
        }
    }

    .comment-item {
        position: relative;
        
        padding: 20px;
        border-radius: 4px;
        background-color: #f5f5f5;
    
        font-size: 13px;
        line-height: 20px;
    
        &__name {
            font-weight: bold;
            margin-bottom: 10px;
        }
    
        &__text {
            margin-bottom: 14px;
        }
    
        & + .comment-item {
            margin-top: 15px;
        }
    }
</style>