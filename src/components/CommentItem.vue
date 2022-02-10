<template>
    <div class="comment-wrap">
        
        <div class="comment-item">
            <div class="comment-item__name">{{ comment.userName }}</div>
            <div class="comment-item__text">{{ comment.text }}</div>
            <div class="button _sm _green" @click="toggleAnswerForm">{{ isAnswerFormActive ? 'Отмена' : 'Ответить'}}</div>
            <div class="button _sm _red" @click="removeComment(comment.id)">Удалить комментарий</div>
        </div>
    
        <div class="comment-wrap__answers">
            
            <div class="comment-wrap__answer-form" v-show="isAnswerFormActive">
                <form-new-comment :parent-comment-id="comment.id"
                                  @comment-created="toggleAnswerForm"></form-new-comment>
            </div>
    
            <div class="comment-wrap__childs" v-if="comment.childComments">
                <comment-item v-for="childComment in comment.childComments"
                              :key="childComment.id"
                              :comment-data="childComment"
                              :class="{'_element-processing': childComment.isInProcessing}">
                </comment-item>
            </div>
            
        </div>
        
    </div>
</template>

<script>
    import FormNewComment from '../components/FormNewComment';

    export default {
        components: {
            FormNewComment
        },
        inject: ['removeComment'],
        props: ['commentData', 'articleId' ],
        data() {
            return {
                comment: this.commentData,
                isInProcessing: false,
                isAnswerFormActive: false
            }
        },
        methods: {
            toggleAnswerForm() {
                this.isAnswerFormActive = !this.isAnswerFormActive;
            }
        },
    }
</script>


<style lang="less">
    @child-left-padding: 60px;
    .comment-wrap {
        
        position: relative;
        padding-top: 15px;
    
        &__answers {
            position: relative;
            overflow: hidden;
            padding-left: @child-left-padding;
        }
        &__answer-form {
            position: relative;
            padding: 15px 0 30px;
            &:after {
                position: absolute;
                content: '';
                left: -@child-left-padding / 2;
                bottom: 100%;
                margin-bottom: -52px;
                height: 9999px;
                width: 1px;
                background-color: #ddd;
            }
            &:before {
                position: absolute;
                content: '';
                width: 10px;
                height: 10px;
                background-color: #ddd;
                border-radius: 50%;
                top: 52px;
                left: -@child-left-padding/2 - 5px;
            }
        }
        &__childs {
            position: relative;
            
            .comment-item {
                &:after {
                    position: absolute;
                    content: '';
                    left: -@child-left-padding / 2;
                    bottom: 100%;
                    margin-bottom: -26px;
                    width: 1px;
                    height: 9999px;
                    background-color: #ddd;
                }
                &:before {
                    position: absolute;
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: #ddd;
                    border-radius: 50%;
                    top: 26px;
                    left: -@child-left-padding/2 - 5px;
                }
            }
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
        
        .button {
            margin-right: 15px;
        }
        
    }
</style>