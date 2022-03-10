<template>
    <section>
        <Form class="auth-form"
              :class="{'preloader-overlay': isInProcessing}"
              @submit="signUp"
        >
            <h2 class="auth-form__header">Регистрация</h2>
            
            <div class="auth-form__group">
                <Field v-model="name"
                       name="name"
                       label="Имя"
                       type="text"
                       placeholder="Имя"
                       rules="required"
                />
                <ErrorMessage class="error-message auth-form__error" name="name"></ErrorMessage>
            </div>
            
            <div class="auth-form__group">
                <Field v-model="secondName"
                       name="secondName"
                       label="Фамилия"
                       type="text"
                       placeholder="Фамилия"
                       rules="required"
                />
                <ErrorMessage class="error-message auth-form__error" name="secondName"></ErrorMessage>
            </div>
            
            <div class="auth-form__group">
                <Field v-model="email"
                       name="email"
                       label="E-mail"
                       type="text"
                       placeholder="E-mail"
                       rules="required|email"
                />
                <ErrorMessage class="error-message auth-form__error" name="email"></ErrorMessage>
            </div>
            
            <div class="auth-form__group">
                <Field v-model="password"
                       name="password"
                       label="Пароль"
                       type="password"
                       placeholder="Пароль"
                       rules="required|min:6"
                />
                <ErrorMessage class="error-message auth-form__error" name="password"></ErrorMessage>
            </div>
            
            <div class="auth-form__group">
                <Field v-model="confirmpassword"
                       name="confirmpassword"
                       label="Подтверждение пароля"
                       type="password"
                       placeholder="Подтвердите пароль"
                       rules="required|min:6|confirmed:@password"
                />
                <ErrorMessage class="error-message auth-form__error" name="confirmpassword"></ErrorMessage>
            </div>
            
            <button class="button">Зарегистрироваться</button>
            
            <div class="auth-form__bottom">
                Уже зарегистрированы?
                <router-link to="/authentication" class="link" >Войти</router-link>
            </div>
        </Form>
        
    </section>
</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },

        data() {
            return {
                mode: 'signIn',
                isInProcessing: false,

                name: null,
                secondName: null,
                email: null,
                password: null,
                confirmpassword: null
            }
        },

        computed: {
        },

        methods: {
            async signIn() {
                this.isInProcessing = true;

                const authResult = await this.$store.dispatch('signIn', {
                    email: this.email,
                    password: this.password
                });

                this.isInProcessing = false;

                if(authResult) {
                    this.onSuccess()
                }

            },

            async signUp() {

                this.isInProcessing = true;

                const authResult = await this.$store.dispatch('signUp', {
                    name: this.name,
                    secondName: this.secondName,
                    email: this.email,
                    password: this.password
                });

                this.isInProcessing = false;

                if(authResult) {
                    this.onSuccess();
                }
            },

            onSuccess() {
                this.$router.push({ name: 'Home' });
            }

        },
        created() {

        }
    }

</script>

<style lang="less">
    
</style>