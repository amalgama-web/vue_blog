<template>
    <section>
        <div class="page-404">
            <p class="page-404__text">
                Такой страницы не существует
            </p>
            
            <router-link :to="{name: 'Home'}" class="button">
                На главную
            </router-link>
        </div>
    </section>
</template>

<style lang="less">
    .page-404 {
        
        &__text {
            color: orangered;
            font-size: 30px;
            
            margin-bottom: 30px;
        }
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

</style>