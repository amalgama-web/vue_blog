<template>
    <div class="article-not-exist">
        <div class="article-not-exist__message">
            Такой статьи не сущетсвует
        </div>
        <div class="article-not-exist__buttons">
            <router-link to="/" class="button">
                На главную
            </router-link>
            <router-link to="/create" class="button">
                Добавить статью
            </router-link>
        </div>
    </div>
</template>

<style lang="less">
    .article-not-exist {
        display: flex;
        flex-direction: column;
        min-height: 400px;
        justify-content: center;
        align-items: center;
        max-width: 500px;
        margin: 0 auto;
        &__message {
            font-size: 30px;
            color: orangered;
            font-style: italic;
            margin-bottom: 30px;
        }
        &__buttons {
            & * > {
                margin: 0 20px;
            }
        }
    }
</style>