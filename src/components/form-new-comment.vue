<template>
    <Form class="comment-form" @submit="addComment" :class="{'_form-processing': isFormInProcess}">
    
        <div class="comment-form__group">
            <div class="field-label">Ваше имя:</div>
            <Field v-model="userName" name="userName" type="text" placeholder="Ваше имя" :rules="isRequired"/>
            <ErrorMessage name="userName" class="error-message comment-form__error"></ErrorMessage>
        </div>
        
        <div class="comment-form__group">
            <div class="field-label">Ваш комментарий:</div>
            <Field v-model="text" name="text" type="text" placeholder="Введите текст комментария" :rules="isRequired" as="textarea"/>
            <ErrorMessage name="text" class="error-message comment-form__error"></ErrorMessage>
        </div>
        
        <button class="comment-form__button button">Опубликовать комментарий</button>
        <div class="comment-form__button button _green" @click="autofill">Заполнить текстом</div>
        
    </Form>
</template>

<script>
    import { fakeApi } from '../fakeApi.js'
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { randomText } from '../randomText.js';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        
        props: ['articleId'],
        
        data() {
            return {
                userName: '',
                text: '',
                
                isFormInProcess: false
            }
        },

        methods: {
            autofill() {
                this.userName = randomText.getRandomName();
                this.text = randomText.getRandomSentences(4);
            },
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