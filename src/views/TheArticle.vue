<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isArticleDataLoaded">
            <div class="preloader"></div>
        </div>
    
        <div v-else-if="isArticleExist">
    
            <article-block :article="currentArticle"
                           @remove-article="removeArticle"
            ></article-block>
    
            <comment-block v-if="isCommentsDataLoaded"
                           :comments-list="currentArticle.commentsList"
                           :comments-count="commentsCount"
            ></comment-block>
            
            <div class="button"
                 @click="toggleCommentForm"
                 v-show="!isCommentFormOpen"
            >Добавить комментарий
            </div>
    
            <form-new-comment
                    v-show="isCommentFormOpen"
                    @comment-created="toggleCommentForm"
            ></form-new-comment>
        </div>
        
        <article-not-exist v-else></article-not-exist>
        
        
    </div>
</template>

<script>
    import commentsService from '../services/commentsService';
    import articleService from '../services/articleService';
    import createUrlService from '../services/createUrlService';
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
                
                isArticleDataLoaded: false,
                isCommentsDataLoaded: false,
                isCommentFormOpen: false,
                isArticleExist: true
            }
        },
        
        computed: {
            commentsCount() {
                return commentsService.countCommentsInTree(this.currentArticle.commentsList);
            }
        },
        
        methods: {
            toggleCommentForm() {
                this.isCommentFormOpen = !this.isCommentFormOpen;
            },
            
            addComment(commentData) {
                
                const url = createUrlService.commentsAdd(this.currentArticle.id, this.$store.getters.token);
                const payload = {
                    timeCreated: {
                        '.sv': 'timestamp'
                    },
                    creatorId: this.$store.getters.userId,
                    userName: this.$store.getters.userFullName,
                    text: commentData.text,
                    parentCommentId: commentData.parentCommentId
                };
                
                return fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(payload)
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        
                        const newCommentObj = {
                            id: responseData.name,
                            creatorId: this.$store.getters.userId,
                            userName: this.$store.getters.userFullName,
                            text: commentData.text,
                            parentCommentId: commentData.parentCommentId,
                            commentsList: [],
                            timeCreated: new Date().getTime()
                        };
                        
                        if(commentData.parentCommentId) {
                            // is child
                            const parentComment = this.currentArticle.commentsFlatList.find(comment => comment.id === commentData.parentCommentId);
                            parentComment.commentsList.push(newCommentObj);
                        } else {
                            // is root
                            this.currentArticle.commentsList.push(newCommentObj);
                        }
                        this.currentArticle.commentsFlatList.push(newCommentObj);
                        
                    })
            },
            
            removeComment(commentId) {
                
                const url = createUrlService.commentEdit(this.currentArticle.id, commentId, this.$store.getters.token);
                
                return fetch(url, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            isDeleted: true
                        })
                    })
                    .then(response => {
                        if(response.ok) {
                            this.removeCommentLocal(commentId);
                        }
                        return response.json();
                    })
                    .then(() => {
                        // parentList.splice(targetIndex, 1);
                    })
                    .finally(() => {
                    });
            },
            
            removeCommentLocal(commentId) {
                const targetComment = this.currentArticle.commentsFlatList.find(comment => comment.id === commentId);
                const parentCommentId = targetComment.parentCommentId;
                
                if(parentCommentId) {
                    const parentComment = this.currentArticle.commentsFlatList.find(commentItem => commentItem.id === parentCommentId);
                    const parentCommentsList = parentComment.commentsList;
                    
                    parentCommentsList.splice( parentCommentsList.indexOf(targetComment), 1);
                    
                } else {
                    
                    this.currentArticle.commentsList.splice(this.currentArticle.commentsList.indexOf(targetComment), 1);
                    
                }
            },

            removeArticle(articleId) {
                
                this.showPageloader();

                const url = createUrlService.article(articleId, this.$store.getters.token);

                fetch(url, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(() => {
                    })
                    .finally(() => {
                        this.hidePageloader();
                        this.$router.push({ name: 'Home' });
                    });
            }
        },
        
        // todo async await
        created() {
            
            const url = createUrlService.article(this.$route.params.id);
            
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    if (responseData === null) {
                        this.isArticleExist = false;
                        // todo
                        return;
                    }
                    this.currentArticle = articleService.prepareArticle(responseData, this.$route.params.id);
                    this.isArticleDataLoaded = true;
                    
                    const url = createUrlService.listComments(this.$route.params.id);
                    return fetch(url);
                })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    
                    const commentsFlatList = commentsService.prepareCommentsFlatList(responseData);
                    const commentsTreeList = commentsService.createCommentsTreeList(commentsFlatList);
                    
                    this.currentArticle.commentsList = commentsTreeList;
                    this.currentArticle.commentsFlatList = commentsFlatList;
                    
                    this.isCommentsDataLoaded = true;
                    
                })
                .finally(() => {
                });
        }
    }
</script>
