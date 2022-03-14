<template>
    <footer class="l-footer">
        <div class="l-container l-footer__inner">
            <ul class="footer-nav">
                <li class="footer-nav__item">
                    <router-link :to="{name: 'Home'}">Главная</router-link>
                </li>
                <li class="footer-nav__item">
                    <router-link :to="{name: 'About'}">О проекте</router-link>
                </li>
                <li class="footer-nav__item">
                    <router-link :to="{name: 'Contacts'}">Контакты</router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {},

        methods: {}
    }
</script>

<style lang="less">
    .l-footer {
        background-color: #eee;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .3);
        
        &__inner {
            height: 50px;
            display: flex;
            align-items: center;
            /*justify-content: flex-end;*/
        }
    }
    
    .footer-nav {
        display: flex;
        
        &__item {
            &:not(:last-child) {
                margin-right: 30px;
            }
        }
    }
</style>

