<template>
    <section class="l-container">
        <router-link to="/" class="button">
            ← К списку статей
        </router-link>
    
        <form class="auth-form" @submit.prevent="submit">
            <h2 class="auth-form__header" v-if="isSignup">Регистрация</h2>
            <h2 class="auth-form__header" v-else>Вход</h2>
            
            <input v-model="name" v-if="isSignup" type="text" placeholder="Имя">
            <input v-model="secondName" v-if="isSignup" type="text" placeholder="Фамилия">
            
            <input v-model="email" type="text" placeholder="E-mail">
            <input v-model="password" type="password" placeholder="Пароль">
            <button class="button" type="submit">{{ isSignup ? 'Зарегистрироваться' : 'Войти'}}</button>
            
            <div class="auth-form__bottom" v-if="isSignup">
                Уже зарегистрированы?
                <a href="#" @click="setMode('signIn')">Войти</a>
            </div>
            <div class="auth-form__bottom" v-else>
                Еще не зарегистрированы?
                <a href="#" @click="setMode('signUp')">Регистрация</a>
            </div>
        </form>
        
    </section>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                mode: 'signIn',
                
                name: null,
                secondName: null,
                email: null,
                password: null
            }
        },
        
        computed: {
            isSignup() {
                return this.mode === 'signUp';
            }
        },

        methods: {
            submit() {
                this.isSignup ? this.signUp() : this.signIn();
            },
            setMode(mode) {
                this.mode = mode;
            },
            signIn() {
                this.$store.dispatch('signIn', {
                    email: this.email,
                    password: this.password
                });
            },
            signUp() {
                this.$store.dispatch('signUp', {
                    name: this.name,
                    secondName: this.secondName,
                    email: this.email,
                    password: this.password
                });
            },
            
        },
        created() {

        }
    }

</script>

<style lang="less">

    .auth-form {
        max-width: 400px;
        padding: 30px 20px;
        margin: 0 auto;
        text-align: center;
        &__header {
            text-align: center;
        }
        &__bottom {
            text-align: center;
            margin-top: 20px;
        }
        input {
            margin-bottom: 20px;
        }
    }
</style>