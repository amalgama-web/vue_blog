<template>
    <header class="header">
        <div class="header__inner">
            <div class="header__left">
            
            </div>
            <div class="header__right">
                
                <div v-if="isAuth" class="favorites">
                    Избранное
                    <span class="preloader _sm _inline" v-if="isFavoritesLoading"></span>
                    <router-link v-else
                                 to="/profile/favorites"
                                 class="favorites__button"
                    >
                        <span class="favorites__icon">❤</span> {{ favoritesCount }}
                    </router-link>
                </div>
    
                <div v-if="isAuth" class="user-plate">
                    <router-link to="/profile/user">
                        <span class="user-plate__name">{{ $store.getters.userFullName }}</span>
                    </router-link>
                    (<a href="#" @click.prevent="logout()">выйти</a>)
                    <router-link to="/profile/user" class="user-plate">
                        <span class="user-plate__icon">{{ $store.getters.userInitials }}</span>
                    </router-link>
                </div>
    
                <div v-else class="user-plate">
                    <span class="user-plate__name">
                        <router-link to="/authentication">
                           Вход
                        </router-link>
                         /
                        <router-link to="/registration">
                           Регистрация
                        </router-link>
                    </span>
                    <span class="user-plate__icon _noname"></span>
                </div>
            </div>
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
                this.$router.push({ name: 'Home' });
            },
        }
    }
</script>

<style lang="less">
    .header {
        position: sticky;
        z-index: 10;
        top: 0;
        background-color: #eee;
        box-shadow: 0 0 20px 0 rgba(0,0,0,.3);
        &__inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            max-width: 1200px;
            height: 75px;
            margin: 0 auto;
            padding: 20px;
        }
        &__right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        &__title {
            text-align: center;
            font-size: 25px;
        }
        &__user-info {
            display: inline-flex;
            align-items: center;
        }
        
    }
    .user-plate {
        display: flex;
        align-items: center;
        &__icon {
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            margin-left: 7px;
            
            @square: 46px;
            height: @square;
            width: @square;
    
            font-size: 20px;
            line-height: @square;
            color: #cccccc;
    
            background-color: #2d2d2d;
            text-transform: uppercase;
            
            border-radius: 50%;
            border: 3px solid cornflowerblue;
            
            &._noname {
                &:before {
                    content: '';
                    position: absolute;
                    @square: 15px;
                    width: @square;
                    height: @square;
                    background-color: #cccccc;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 50%;
                    
                }
                &:after {
                    content: '';
                    position: absolute;
                    width: 44px;
                    height: 139px;
                    background-color: #cccccc;
                    top: 27px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-radius: 50%;
                }
            }
        }
        &__name {
            margin-right: 7px;
        }
        
        &:hover {
            .user-plate__icon {
                border-color: darken(cornflowerblue, 10%);
            }
        }
    }
    .favorites {
        font-size: 13px;
        line-height: 1;
        padding-bottom: 3px;
        margin-right: 40px;
        
        &__icon {
            color: orangered;
            font-size: 15px;
            vertical-align: text-bottom;
        }
        &__button {
            display: inline-block;
            padding: 4px;
            border-radius: 3px;
        }
    }
</style>

