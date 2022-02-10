<template>
    <div class="comments">
        <div class="comments__head">Комментарии<span v-if="commentsCount">&nbsp;{{ commentsCount }}</span>:</div>
        <div class="comments__list">
            
            <div class="comments__empty" v-if="!commentList.length">Комментариев еще нет. Будьте первым</div>
            
            <comment-item v-for="comment in commentList"
                          :key="comment.id"
                          :comment-data="comment"
                          :class="{'_element-processing': comment.isInProcessing}">
            </comment-item>
        
        </div>
    </div>
</template>


<script>
    import CommentItem from '../components/CommentItem';
    import commentsService from "../services/commentsService";
    
    export default {
        components: {
            CommentItem,
        },
        props: ['commentList'],
        computed: {
            commentsCount() {
                return commentsService.countComments( this.commentList );
            }
        }
    }
</script>

<style lang="less">
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
</style>