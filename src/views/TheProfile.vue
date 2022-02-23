<template>
    <div class="l-container">
        <h1>Профиль</h1>
        
        <ul class="tabs">
            <li class="tabs__item">
                <router-link to="/profile/user" class="tabs__link">
                    Ваши данные
                </router-link>
            </li>
            <li class="tabs__item">
                <router-link to="/profile/favorites" class="tabs__link">
                    Избранное
                </router-link>
            </li>
            <li class="tabs__item">
                <router-link to="/profile/articles" class="tabs__link">
                    Опубликованное
                </router-link>
            </li>
            <li class="tabs__item">
                <router-link to="/profile/archive" class="tabs__link">
                    Архив статей
                </router-link>
            </li>
        </ul>
    
        <router-view v-slot="{ Component }">
            <transition name="child-route" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>

    
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style lang="less">
    .tabs {
        display: flex;
        border-bottom: 1px solid #ddd;
        margin-bottom: 40px;
        &__item {
        
        
        }
        &__link {
            display: block;
            padding: 15px 20px;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            
            color: #222;
            &:link {color: #222;}
            &:visited {color: #222;}
            &:hover {color: #222;}
            &:active {color: #222;}
    
            &:hover {
                border-bottom-color: fade(cornflowerblue, 50%);
            }
    
            &.router-link-exact-active {
                border-bottom: 2px solid cornflowerblue;
                cursor: default;
            }
        }
    }

    @duration: 200ms;
    .child-route-enter-from {
    }
    .child-route-enter-to {
    }
    .child-route-enter-active {
        transition: all @duration linear;
    }

    .child-route-leave-from {
        opacity: 1;
        transform: translateX(0);
    }
    .child-route-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }
    .child-route-leave-active {
        transition: all @duration linear;
    }

    .tabs-enter-from {
        opacity: 0;
        transform: translateX(30px);
    }
    .tabs-enter-to {
        opacity: 1;
        transform: translateX(0);
    }
    .tabs-enter-active {
        transition: all @duration linear;
    }
    .tabs-leave-from {
    }
    .tabs-leave-to {
    }
    .tabs-leave-active {
    }
</style>

