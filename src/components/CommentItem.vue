<template>
    <div class="comment-wrap" :class="{'preloader-overlay': isInProcessing}">
        
        <div class="comment-item">
            
            <div class="comment-item__head">
                <span class="comment-item__name">{{ commentData.userName }}</span>&nbsp;
                <span class="comment-item__time">{{ commentCreatedTime }}</span>
            </div>
            
            <div class="comment-item__text">{{ commentData.text }}</div>
    
            <div v-if="isAuth">
                
                <button type="button" class="button _sm _green"
                     @click="toggleAnswerForm"
                >{{ isAnswerFormActive ? 'Отмена' : 'Ответить'}}
                </button>
                
                <div v-if="isCreatorComment"
                     class="button _sm _red"
                     @click="remove()"
                >Удалить комментарий
                </div>
                
            </div>
            
        </div>
    
        <div class="comment-wrap__answers">
    
            <div class="comment-wrap__answer-form"
                 v-show="isAnswerFormActive"
            >
                <form-new-comment :parent-comment-id="commentData.id"
                                  @comment-created="toggleAnswerForm"
                ></form-new-comment>
            </div>
    
            <div class="comment-wrap__childs"
                 v-if="commentData.commentsList"
            >
                <comment-item v-for="childComment in commentData.commentsList"
                              :key="childComment.id"
                              :comment-data="childComment"
                >
                </comment-item>
            </div>
            
        </div>
        
    </div>
</template>

<script>
    import FormNewComment from '../components/FormNewComment';
    import textService from "../services/textService";

    export default {
        components: {
            FormNewComment
        },
        inject: ['removeComment'],
        props: ['commentData'],
        data() {
            return {
                isInProcessing: false,
                isAnswerFormActive: false
            }
        },
        computed: {
            commentCreatedTime() {
                return textService.getFormattedTime(this.commentData.timeCreated);
            },
            isCreatorComment() {
                return this.commentData.creatorId === this.$store.getters.userId;
            },
            isAuth() {
                return this.$store.getters.isAuth;
            }
        },
        methods: {
            toggleAnswerForm() {
                this.isAnswerFormActive = !this.isAnswerFormActive;
            },
            remove() {
                this.isInProcessing = true;
                this.removeComment(this.commentData.id).finally( () => {
                    this.isInProcessing = false;
                });
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
        
        &__head {
            margin-bottom: 10px;
        }
        
        &__name {
            font-weight: bold;
        }
    
        &__time {
            color: #555;
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