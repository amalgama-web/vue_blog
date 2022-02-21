<template>
    <header class="header">
        <div class="header__inner">
            <div>
                <div v-if="isAuth">
                    Избранное
                    <span class="preloader _sm _inline" v-if="isFavoritesLoading"></span>
                    <span v-else>{{ favoritesCount }}</span>
                </div>
            </div>
            
            <div v-if="isAuth" class="user-plate">
                <router-link to="/profile/user">
                    <span class="user-plate__icon">{{ $store.getters.userInitials }}</span>
                    <span class="user-plate__name">{{ $store.getters.userFullName }}</span>
                </router-link>
                (<a href="#" @click.prevent="logout()">выйти</a>)
            </div>
            <router-link v-else to="/auth" class="button">
                Вход / Регистрация
            </router-link>
        </div>
    </header>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
            }
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuth;
            },
            isFavoritesLoading() {
                return this.$store.getters.isFavoritesLoading;
            },
            favoritesCount() {
                return this.$store.getters.favoritesCount;
            }
        },
        
        methods: {
            logout() {
                this.$store.dispatch('logout');
            },
        }
    }
</script>

<style lang="less">
</style>

