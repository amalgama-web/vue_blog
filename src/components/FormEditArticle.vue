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
    
        <div v-if="isArticleEdit"
             class="form-edit-article__group"
        >
            <input v-model="isArchived" type="checkbox" id="isArchived">
            <label for="isArchived">Поместить в архив</label>
            <p class="form-edit-article__info-text">Статья будет перемещана в архив и не будет выводиться в списке на главной странице, вы можете найти статью в профиле, в разделе архив статей и вновь опубликовать ее.</p>
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
        
        inject: ['showNotification'],
        
        data() {
            return {
                name: '',
                shortText: '',
                fullText: '',
                timeCreated: null,
                isArchived: false,
                
                isFormInProcess: false
            }
        },
        
        computed: {
            isArticleEdit() {
                return this.preloadArticleId !== undefined;
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
                if (this.isArticleEdit) {
                    
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
                
                const timeCreated = Math.abs(this.timeCreated);
                
                const payload = {
                    name: this.name,
                    shortText: this.shortText,
                    fullText: this.fullText,
                    timeCreated: this.isArchived ? -timeCreated : timeCreated,
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
            },

            async preloadArticle() {
                this.isFormInProcess = true;

                try {
                    const url = createUrlService.article(this.preloadArticleId);
                    
                    const response = await fetch(url);

                    if(!response.ok) {
                        throw new Error('Ошибка загрузки статьи');
                    }

                    const responseData = await response.json();

                    if(!responseData) {
                        throw new Error('Статья не найдена');
                    }
                    
                    this.name = responseData.name;
                    this.shortText = responseData.shortText;
                    this.fullText = responseData.fullText;
                    this.timeCreated = responseData.timeCreated;
                    this.isArchived = responseData.timeCreated < 0;

                } catch (err) {
                
                    this.showNotification(err.message, 'error');
                
                } finally {
                    this.isFormInProcess = false;
                }
            },
        },
        
        created() {
            if (this.isArticleEdit) this.preloadArticle();
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
        &__info-text {
            font-size: 13px;
            color: #999;
            margin: 5px 0 0 0;
        }
    }
</style>

