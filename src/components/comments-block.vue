<template>
    <div class="comments">
        <div class="comments__head">Комментарии:</div>
        <div class="comments__list">
            
            <div class="comments__empty" v-if="!commentsList.length">Комментариев еще нет. Будьте первым</div>
            
            <comment-item v-for="comment in commentsList"
                          :key="comment.id"
                          :comment-data="comment"
                          :class="{'_element-processing': comment.isInProcessing}">
            </comment-item>
        
        </div>
    </div>
</template>


<script>
    import commentItem from '../components/comment-item';
    export default {
        components: {
            commentItem,
        },
        props: ['commentsList'],
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