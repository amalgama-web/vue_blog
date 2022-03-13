<template>
    <div v-show="routes.length" class="l-container">
        <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
                <router-link :to="{name: 'Home'}">Главная</router-link>
            </li>
            <li v-for="route in routes"
                :key="route.name"
                class="breadcrumbs__item"
            >
                {{route.meta.ruName}}
            </li>
        </ul>
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
        computed: {
            routes() {
                return this.$route.matched.filter(item => item.name !== 'Home');
            }
        },

        methods: {
        },
        
        watch: {
        },

        created() {
        }
    }
</script>

<style lang="less">
    .breadcrumbs {
        display: flex;
        align-items: center;
        
        padding-top: 45px;
        
        &__item {
            position: relative;
            padding-right: 30px;
            &:after {
                display: block;
                content: '>';
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-47%);
            }
            &:last-child:after {
                display: none;
            }
        }
    }
</style>

