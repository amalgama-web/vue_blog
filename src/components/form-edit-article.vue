<template>
    <Form class="form-new-article" @submit="publishArticle">
        <div class="form-new-article__group">
            <div class="field-label">Заголовок статьи:</div>
            <Field name="name" type="text" placeholder="Заголовок вашей статьи" :rules="isRequired"/>
            <ErrorMessage class="error-message form-new-article__error" name="name"></ErrorMessage>
        </div>
    
        <div class="form-new-article__group">
            <div class="field-label">Текст превью:</div>
            <Field name="shortText" as="textarea" placeholder="Превью" :rules="isRequired"/>
            <ErrorMessage class="error-message form-new-article__error" name="shortText"></ErrorMessage>
        </div>
    
        <div class="form-new-article__group">
            <div class="field-label">Полный текст:</div>
            <Field name="fullText" as="textarea" placeholder="Полный текст вашей статьи" :rules="isRequired"/>
            <ErrorMessage class="error-message form-new-article__error" name="fullText"></ErrorMessage>
        </div>
    
        <div class="form-new-article__group">
            <button class="button form-new-article__submit">Опубликовать статью</button>
        </div>
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
        data() {
            return {
            }
        },

        methods: {
            publishArticle(values, formActions) {
                let newArticleData = fakeApi.addArticle({
                    name: values.name,
                    shortText: values.shortText,
                    fullText: values.fullText
                });

                formActions.resetForm();
                
                this.$router.push({ name: 'Article', params: { id: newArticleData } });
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
    .form-new-article {
        &__group {
            position: relative;
            margin-bottom: 30px;
            
            &:last-child {
                margin-bottom: 0;
            }
        }
        &__error {
            position: absolute;
            top: 100%;
            left: 0;
        }
        &__submit {
            margin-top: 10px;
        }
        
    }
</style>

