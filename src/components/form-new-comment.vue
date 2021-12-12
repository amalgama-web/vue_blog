<template>
    <Form class="comment-form" @submit="addComment" :class="{'_form-processing': isFormInProcess}">
    
        <div class="comment-form__group">
            <div class="field-label">Ваше имя:</div>
            <Field name="userName" type="text" placeholder="Ваше имя" :rules="isRequired"/>
            <ErrorMessage name="userName" class="error-message comment-form__error"></ErrorMessage>
        </div>
        
        <div class="comment-form__group">
            <div class="field-label">Ваш комментарий:</div>
            <Field name="text" type="text" placeholder="Введите текст комментария" :rules="isRequired" as="textarea"/>
            <ErrorMessage name="text" class="error-message comment-form__error"></ErrorMessage>
        </div>
        
        <button class="comment-form__submit button">Опубликовать комментарий</button>
        
    </Form>
</template>

<script>
    import { fakeApi } from '../fakeApi.js'
    import { Form, Field, ErrorMessage } from 'vee-validate';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        
        props: ['articleId'],
        
        data() {
            return {
                isFormInProcess: false
            }
        },

        methods: {
            addComment(values, formActions) {
                this.isFormInProcess = true;
                fakeApi.addComment({
                    userName: values.userName,
                    text: values.text
                }, this.articleId).then((newComment) => {
                    this.$emit('comment-created', newComment);
                    formActions.resetForm();
                    this.isFormInProcess = false;
                });
            },
            isRequired(value) {
                if (!value) {
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
        max-width: 400px;
        
        &__group {
            position: relative;
            margin-bottom: 30px;
        }
        &__submit {
            margin-top: 10px;
        }
        &__error {
            position: absolute;
            top: 100%;
            left: 0;
        }
    }
</style>