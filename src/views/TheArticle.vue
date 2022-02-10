<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isDataLoaded">
            <div class="preloader"></div>
        </div>
    
        <article-not-exist v-else-if="!isArticlesExist"></article-not-exist>
        
        <div v-else>
            <article-block :article="currentArticle" @remove-article="removeArticle"></article-block>
    
            <comment-block :comment-list="currentArticle.commentList"></comment-block>
    
            <div class="button" @click="toggleCommentForm" v-show="!isCommentFormOpen">Добавить комментарий</div>
            <form-new-comment v-show="isCommentFormOpen" @comment-created="toggleCommentForm"></form-new-comment>
        </div>
        
    </div>
</template>

<script>
    import fakeApiService from '../services/fakeApiService';
    import commentsService from '../services/commentsService';
    import FormNewComment from '../components/FormNewComment';
    import ArticleBlock from '../components/ArticleBlock';
    import CommentBlock from '../components/CommentBlock';
    import ArticleNotExist from '../components/ArticleNotExist';
    
    export default {
        components: {
            ArticleBlock,
            ArticleNotExist,
            CommentBlock,
            FormNewComment
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
                isArticlesExist: false
            }
        },

        methods: {
            toggleCommentForm() {
                this.isCommentFormOpen = !this.isCommentFormOpen;
            },
            
            addComment(data, parentCommentId) {
                return new Promise( (resolve) => {
                    fakeApiService
                        .addComment(data, this.currentArticle.id, parentCommentId)
                        .then( (newComment) => {
                            resolve();
                            const commentList = commentsService.getNodeData(this.currentArticle.commentList, parentCommentId).childList;
                            commentList.push(newComment);
                        });
                });
            },
            
            removeComment(commentId) {
                const commentsTreeNode = commentsService.getNodeData(this.currentArticle.commentList, commentId);
                commentsTreeNode.currentNodeList[ commentsTreeNode.indexInCurrentNode ].isInProcessing = true;
                fakeApiService
                    .removeComment(this.currentArticle.id, commentId)
                    .then( () => {
                        commentsTreeNode.currentNodeList.splice(commentsTreeNode.indexInCurrentNode, 1)
                    });
            },

            removeArticle(articleId) {
                this.showPageloader();
                fakeApiService
                    .removeArticle(articleId)
                    .then(() => {
                        this.hidePageloader();
                        this.$router.push({ name: 'Home' });
                    });
            }
        },
        
        created() {
            fakeApiService
                .getArticleById(this.$route.params.id)
                .then((response) => {
                    if (response ) {
                        this.currentArticle = response;
                        this.isArticlesExist = true;
                        this.isDataLoaded = true;
                    } else {
                        this.isDataLoaded = true;
                    }
                });
        }
    }
</script>
