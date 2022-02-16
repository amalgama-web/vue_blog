<template>
    <div class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
        
        <div class="preloader-wrap" v-if="!isDataLoaded">
            <div class="preloader"></div>
        </div>
    
        <div v-else-if="isArticleExist">
            <article-block :article="currentArticle" @remove-article="removeArticle"></article-block>
        
            <comment-block :comment-list="currentArticle.commentList"></comment-block>
        
            <div class="button" @click="toggleCommentForm" v-show="!isCommentFormOpen">Добавить комментарий</div>
            <form-new-comment
                    v-show="isCommentFormOpen"
                    @comment-created="toggleCommentForm"
                    comment-branch=""
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
                
                isDataLoaded: false,
                isCommentFormOpen: false,
                isArticleExist: true
            }
        },
        
        methods: {
            toggleCommentForm() {
                this.isCommentFormOpen = !this.isCommentFormOpen;
            },
            
            addComment(commentData, commentBranch) {
                
                const commentBranchNodesIds = commentBranch.split('/').filter(item => item !== '');
                
                const commentBranchPath = commentBranchNodesIds.map(nodeId => `/${nodeId}/commentList`).join('');
                
                const targetCommentList = commentsService.findTargetList(this.currentArticle.commentList, commentBranchNodesIds);
                
                return fetch(`https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/articles/${this.currentArticle.id}/commentList${commentBranchPath}.json`, {
                        method: 'POST',
                        body: JSON.stringify({
                            timeCreated: {
                                '.sv': 'timestamp'
                            },
                            ...commentData
                        })
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(responseData => {
                        targetCommentList.push({
                            id: responseData.name,
                            commentList: [],
                            timeCreated: new Date().getTime(),
                            ...commentData
                        });
                    })
                    .finally(() => {
                    });
            },
            
            removeComment(commentBranch) {
                
                const commentBranchNodesIds = commentBranch.split('/').filter(item => item !== '');
                
                const commentBranchPath = commentBranchNodesIds.map(nodeId => `/commentList/${nodeId}`).join('');
                
                const targetCommentId = commentBranchNodesIds.pop();
                
                const parentList = commentsService.findTargetList(this.currentArticle.commentList, commentBranchNodesIds);
                
                const targetIndex = parentList.findIndex(commentItem => commentItem.id === targetCommentId);
                
                return fetch(`https://blogdb-8522b-default-rtdb.europe-west1.firebasedatabase.app/articles/${this.currentArticle.id}${commentBranchPath}.json`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(() => {
                        parentList.splice(targetIndex, 1);
                    })
                    .finally(() => {
                    });
                
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
        
        created() {
            const url = createUrlService.article(this.$route.params.id);
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    if (responseData === null) {
                        this.isArticleExist = false;
                        return;
                    }
                    this.currentArticle = articleService.prepareArticle(responseData, this.$route.params.id);
                })
                .finally(() => {
                    this.isDataLoaded = true;
                });
        }
    }
</script>
