<template>
    <div class="l-container" v-if="isDataLoaded">
        <router-link to="/">
            <div class="button">← К списку статей</div>
        </router-link>
        
        <div class="article-view">
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
            
            <div class="comment-form" v-show="isCommentFormOpen">
                <div class="comment-form__group">
                    <div class="comment-form__label">Ваше имя:</div>
                    <input type="text" v-model="commentFormName">
                </div>
                <div class="comment-form__group">
                    <div class="comment-form__label">Ваш комментарий:</div>
                    <textarea v-model="commentFormText" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="button" @click="addComment">Отправить</div>
            </div>
        
        </div>
    </div>
</template>

<script>
    import { fakeApi } from '../fakeApi.js'
    export default {
        data() {
            return {
                isDataLoaded: false,
                currentArticle: null,

                commentList: [],
                commentFormName: '',
                commentFormText: '',
                isCommentFormOpen: false,
            }
        },

        methods: {
            openCommentForm() {
                this.isCommentFormOpen = true;
            },

            addComment() {
                if (!this.currentArticle) return;

                let newComment = fakeApi.addComment({
                    userName: this.commentFormName,
                    text: this.commentFormText
                }, this.currentArticle.id);

                this.currentArticle.commentList.push(newComment);

                this.commentFormName = '';
                this.commentFormText = '';
                this.isCommentFormOpen = false;
            },

            removeComment(commentID) {
                if (!this.currentArticle) return;

                fakeApi.removeComment(commentID, this.currentArticle.id);

                let indexToRemove = this.commentList.findIndex(item => item.id === commentID );
                this.currentArticle.commentList.splice(indexToRemove, 1);
            }
        },
        
        created() {
            this.currentArticle = fakeApi.getArticleByID(this.$route.params.id);
            this.isDataLoaded = true;
        }
    }
</script>