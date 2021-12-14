<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isDataLoaded">
            <div class="preloader"></div>
        </div>
        
        <div v-else>
            <article-block :article="currentArticle" @remove-article="removeArticle"></article-block>
    
            <comments-block :comments-list="currentArticle.commentList"></comments-block>
    
            <div class="button" @click="toggleCommentForm" v-show="!isCommentFormOpen">Добавить комментарий</div>
            <form-new-comment v-show="isCommentFormOpen" @comment-created="toggleCommentForm"></form-new-comment>
            
        </div>
        
    </div>
</template>

<script>
    import { fakeApi } from '../fakeApi.js';
    import { commentsFunctions } from '../commentsFunctions.js';
    import formNewComment from '../components/form-new-comment';
    import articleBlock from '../components/article-block';
    import commentsBlock from '../components/comments-block';
    
    export default {
        components: {
            articleBlock,
            commentsBlock,
            formNewComment
        },
        
        provide() {
            return {
                addComment: this.addComment,
                removeComment: this.removeComment
            }
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
            toggleCommentForm() {
                this.isCommentFormOpen = !this.isCommentFormOpen;
            },
            
            addComment(data, parentCommentId) {
                return new Promise( (resolve) => {
                    fakeApi
                        .addComment(data, this.currentArticle.id, parentCommentId)
                        .then( (newComment) => {
                            resolve();
                            const currentCommentList = commentsFunctions.findCommentListInTree(this.currentArticle.commentList, parentCommentId);
                            currentCommentList.push(newComment);
                        });
                });
            },
            
            removeComment(commentId) {
                const treeNode = commentsFunctions.findCommentInTree(this.currentArticle.commentList, commentId);
                treeNode.list[ treeNode.index ].isInProcessing = true;
                fakeApi
                    .removeComment(this.currentArticle.id, commentId)
                    .then( () => {
                        treeNode.list.splice(treeNode.index, 1)
                    });
            },

            removeArticle(articleId) {
                this.showPageloader();
                fakeApi
                    .removeArticle(articleId)
                    .then(() => {
                        this.hidePageloader();
                        this.$router.push({ name: 'Home' });
                    });
            }
        },
        
        created() {
            fakeApi
                .getArticleById(this.$route.params.id)
                .then((response) => {
                    this.currentArticle = response;
                    this.isDataLoaded = true;
                });
        }
    }
</script>
