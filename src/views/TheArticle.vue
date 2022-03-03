<template>
    <div class="l-container _v-padding">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isArticleDataLoaded">
            <div class="preloader"></div>
        </div>
        
        <div v-else-if="isArticleLoadingError">
            Ошибка при загрузке статьи
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
        
        inject: ['showPageloader', 'hidePageloader', 'showNotification'],
        
        data() {
            return {
                currentArticle: null,
                
                isArticleDataLoaded: false,
                isCommentsDataLoaded: false,

                isArticleExist: true,
                isArticleLoadingError: false,
                isCommentsLoadingError: false,
                
                isCommentFormOpen: false
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
            
            async addComment(commentData) {
                
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
                
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                
                if(!response.ok) {
                    this.showNotification('Ошибка загрузки комментария, попробуйте позже...', 'error');
                    return;
                }
                
                
                const responseData = await response.json();

                this.addCommentLocally(responseData.name, commentData);

            },
            
            addCommentLocally(commentId, commentData) {
                const newCommentObj = {
                    id: commentId,
                    creatorId: this.$store.getters.userId,
                    userName: this.$store.getters.userFullName,
                    text: commentData.text,
                    parentCommentId: commentData.parentCommentId,
                    commentsList: [],
                    timeCreated: new Date().getTime()
                };
                if(commentData.parentCommentId) {
                    // is child comment
                    const parentComment = this.currentArticle.commentsFlatList.find(comment => comment.id === commentData.parentCommentId);
                    parentComment.commentsList.push(newCommentObj);
                } else {
                    // is root comment
                    this.currentArticle.commentsList.push(newCommentObj);
                }
                
                this.currentArticle.commentsFlatList.push(newCommentObj);
            },
            
            async removeComment(commentId) {
                
                const url = createUrlService.commentEdit(this.currentArticle.id, commentId, this.$store.getters.token);
                
                const response = await fetch(url, {
                    method: 'PATCH',
                    // body: 'asdf'
                    body: JSON.stringify({
                        isDeleted: true
                    })
                });
                
                if(response.ok) {
                    this.removeCommentLocally(commentId);
                } else {
                    this.showNotification('Ошибка при удалении комментария, попробуйте позже...', 'error');
                }
                    
            },

            removeCommentLocally(commentId) {
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
            },

            async loadArticle() {
                const url = createUrlService.article(this.$route.params.id);
                let response = await fetch(url);

                if(!response.ok) {
                    this.isArticleLoadingError = true;
                    this.isArticleDataLoaded = true;
                    throw new Error('Ошибка получения данных статьи, попробуйте позже...');
                }

                const responseData  = await response.json();

                if (!responseData) {
                    this.isArticleExist = false;
                    this.isArticleLoadingError = true;
                    throw new Error('Такой статьи не существует');
                }

                this.currentArticle = articleService.prepareArticle(responseData, this.$route.params.id);
                this.isArticleDataLoaded = true;
            },
            
            async loadComments() {
                const url = createUrlService.listComments(this.$route.params.id);
                const response = await fetch(url);

                if(!response.ok) {
                    throw new Error('Ошибка загрузки комментариев')
                }

                const responseData = await response.json();

                this.currentArticle.commentsFlatList = commentsService.prepareCommentsFlatList(responseData);
                this.currentArticle.commentsList = commentsService.createCommentsTreeList(this.currentArticle.commentsFlatList);
                this.isCommentsDataLoaded = true;

            },

            
        },
        
        async created() {
            
            try {
                await this.loadArticle();
                await this.loadComments();
            } catch (err) {
                this.showNotification(err.message, 'error');
            }
        }
    }
</script>
