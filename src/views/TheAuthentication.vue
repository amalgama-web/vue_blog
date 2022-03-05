<template>
    <section class="l-container _v-padding">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
    
        <Form class="auth-form"
              :class="{'preloader-overlay': isInProcessing}"
              @submit="signIn"
        >
            <h2 class="auth-form__header">Вход</h2>
    
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
            
            <button class="button">Войти</button>
            
            <div class="auth-form__bottom">
                Еще не зарегистрированы?
                <router-link to="/registration" class="link" >Регистрация</router-link>
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
                isInProcessing: false,
                
                email: null,
                password: null
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
            
            onSuccess() {
                this.$router.push({ name: 'Home' });
            }
            
        },
        created() {

        }
    }

</script>

<style lang="less">

    .auth-form {
        position: relative;
        max-width: 400px;
        padding: 30px 20px;
        margin: 0 auto;
        text-align: center;
        &__group {
            position: relative;
        }
        &__error {
            position: absolute;
            top: 100%;
            left: 0;
        }
        &__header {
            text-align: center;
        }
        &__bottom {
            text-align: center;
            margin-top: 20px;
        }
        &__group {
            
            margin-bottom: 30px;
        }
    }
</style>