<template>
    <Form class="form-edit-article" @submit="publishArticle" :class="{'_element-processing': isFormInProcess}">
        <div class="form-edit-article__group">
            <div class="field-label">Заголовок статьи:</div>
            <Field v-model="name" name="name" type="text" placeholder="Заголовок вашей статьи" :rules="isRequired"/>
            <ErrorMessage class="error-message form-edit-article__error" name="name"></ErrorMessage>
        </div>
    
        <div class="form-edit-article__group">
            <div class="field-label">Текст превью:</div>
            <Field v-model="shortText" name="shortText" as="textarea" placeholder="Превью" :rules="isRequired"/>
            <ErrorMessage class="error-message form-edit-article__error" name="shortText"></ErrorMessage>
        </div>
    
        <div class="form-edit-article__group">
            <div class="field-label">Полный текст:</div>
            <Field v-model="fullText" name="fullText" as="textarea" placeholder="Полный текст вашей статьи" :rules="isRequired"/>
            <ErrorMessage class="error-message form-edit-article__error" name="fullText"></ErrorMessage>
        </div>
    
        <div class="form-edit-article__group">
            <input v-model="isArchived" type="checkbox" id="isArchived">
            <label for="isArchived">Поместить в архив</label>
        </div>
    
        <div class="form-edit-article__group">
            <button class="button form-edit-article__button">Опубликовать статью</button>
            <div class="button _green form-edit-article__button" @click="autofill">Заполнить текстом</div>
        </div>
    </Form>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import textService from '../services/textService';
    import createUrlService from "../services/createUrlService";
    
    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        
        props: ['preloadArticleId'],
        
        data() {
            return {
                name: '',
                shortText: '',
                fullText: '',
                isArchived: false,
                
                isFormInProcess: false
            }
        },

        methods: {
            autofill() {
                this.name = textService.getRandomSingleSentence();
                this.shortText = textService.getRandomSentences(5);
                this.fullText = textService.getRandomSentences(10);
            },
            publishArticle(values, formActions) {
                
                // todo предусмотреть вывод сообщения об необходимости авторизоваться
                // if (!this.$store.getters.isAuth) return;
                
                this.isFormInProcess = true;

                // if we edit existing article
                if (this.preloadArticleId !== undefined) {
                    
                    this.updateArticle(formActions);
                    
                    return;
                }
                
                this.createArticle(formActions);
                
            },
            
            isRequired(value) {
                if (!value.trim()) {
                    return 'Это поле обязательно';
                }
                return true;
            },
            
            createArticle(formActions) {
                const url = createUrlService.articles(this.$store.getters.token);

                const payload = {
                    name: this.name,
                    shortText: this.shortText,
                    fullText: this.fullText,
                    creatorId: this.$store.getters.userId,
                    creatorFullName: this.$store.getters.userFullName,
                    isArchived: this.isArchived,
                    timeCreated: {
                        '.sv': 'timestamp'
                    }
                };
                
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                }).then(response => {

                    return response.json();

                }).then(responseData => {

                    this.isFormInProcess = false;

                    formActions.resetForm();

                    this.$emit('article-created', responseData.name)
                });
            },
            
            updateArticle(formActions) {
                const url = createUrlService.article(this.preloadArticleId, this.$store.getters.token);
                
                const payload = {
                    name: this.name,
                    shortText: this.shortText,
                    fullText: this.fullText,
                    isArchived: this.isArchived,
                    timeEdited: {
                        '.sv': 'timestamp'
                    }
                };

                fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(payload)
                }).then(response => {

                    return response.json();

                }).then(responseData => {

                    this.isFormInProcess = false;

                    formActions.resetForm();

                    this.$emit('article-created', responseData.name)

                });
            }
        },
        created() {
            if (this.preloadArticleId === undefined) return;
            
            this.isFormInProcess = true;
            
            const url = createUrlService.article(this.preloadArticleId);

            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    this.name = responseData.name;
                    this.shortText = responseData.shortText;
                    this.fullText = responseData.fullText;
                    this.isArchived = responseData.isArchived;
                })
                .finally(() => {
                    this.isFormInProcess = false;
                });
        }
    }
</script>

<style lang="less">
    .form-edit-article {
        position: relative;
        &__group {
            position: relative;
            max-width: 500px;
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
        &__button {
            margin: 10px 30px 0 0;
        }
    }
</style>

