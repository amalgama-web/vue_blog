<template>
    <div class="comments">
        <div class="comments__head">Комментарии<span v-if="commentsCount">&nbsp;{{ commentsCount }}</span>:</div>
        
        <div class="comments__empty" v-if="!commentsCount">Комментариев еще нет. Будьте первым</div>
        
        <div class="comments__list">
            
            
            <comment-item v-for="comment in commentsList"
                          :key="comment.id"
                          :comment-data="comment"
            >
            </comment-item>
        
        </div>
    </div>
</template>


<script>
    import CommentItem from '../components/CommentItem';
    
    export default {
        components: {
            CommentItem,
        },
        props: ['commentsList', 'commentsCount'],
        computed: {
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