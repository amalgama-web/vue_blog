<template>
    <div class="article-view" >
        <div class="article-view__head">
            {{ article.name }}
        </div>
        <div class="article-view__body">
            {{ article.fullText }}
        </div>
        
        <div class="article-view__buttons">
            <router-link class="button _green"
                         :to="{ name: 'EditArticle', params: { id: article.id } }"
                         @click.stop>
                Редактировать
            </router-link>
            <div class="button _red" @click="$emit('remove-article', article.id)">Удалить статью</div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['article'],
    }
</script>

<style lang="less">
    .article-view {
        padding: 40px 0;
        &__head {
            font-size: 30px;
            margin-bottom: 20px;
        }
        
        &__body {
            margin-bottom: 30px;
            line-height: 1.8;
        }
        &__buttons {
            & > * {
                margin-right: 30px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>