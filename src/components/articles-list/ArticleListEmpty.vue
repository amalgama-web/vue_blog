<template>
    <div class="articles-list-empty">
        <p>
            Ни одной статьи еще не опубликовано
        </p>
        <router-link to="/create" class="button">
            Добавить статью
        </router-link>
    </div>
</template>

<style lang="less">
    .articles-list-empty {
        display: flex;
        flex-direction: column;
        min-height: 400px;
        justify-content: center;
        align-items: center;
        max-width: 500px;
        margin: 0 auto;
        font-style: italic;
        
        font-size: 20px;
        color: #bbb;
    }
</style>