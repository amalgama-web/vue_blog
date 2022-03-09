<template>
    <Form class="comment-form" @submit="createComment" :class="{'preloader-overlay': isFormInProcess}">
    
        <div class="comment-form__group">
            <div class="field-label">Ваш комментарий:</div>
            <Field v-model="text" name="text" type="text" placeholder="Введите текст комментария" :rules="isRequired" as="textarea"/>
            <ErrorMessage name="text" class="error-message comment-form__error"></ErrorMessage>
        </div>
        
        <button class="comment-form__button button">Опубликовать комментарий</button>
        <button type="button" class="comment-form__button button _green" @click="autofill">Заполнить текстом</button>
        
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import textService from '../services/textService';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        inject: ['addComment'],

        props: ['parentCommentId'],
        
        data() {
            return {
                text: '',
                isFormInProcess: false
            }
        },

        methods: {
            createComment(values, formActions) {
                this.isFormInProcess = true;
                
                this.addComment({
                    text: this.text,
                    parentCommentId: this.parentCommentId
                }).finally(() => {
                    formActions.resetForm();

                    this.isFormInProcess = false;

                    this.$emit('comment-created');
                });
                
            },
            
            autofill() {
                this.text = textService.getRandomSentences(4);
            },
            
            isRequired(value) {
                if (!value.trim()) {
                    return 'Это поле обязательно';
                }
                return true;
            },
        },
    }
</script>

<style lang="less">
    .comment-form {
        position: relative;
        max-width: 500px;
        
        &__group {
            position: relative;
            margin-bottom: 30px;
        }
        &__button {
            margin: 10px 30px 0 0;
        }
        &__error {
            position: absolute;
            top: 100%;
            left: 0;
        }
    }
</style>