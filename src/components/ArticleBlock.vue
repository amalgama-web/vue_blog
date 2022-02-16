<template>
    <div class="article-view" >
        <div class="article-view__dates">
            Создано: {{ timeCreated }}
        </div>
        <div class="article-view__dates" v-if="article.timeEdited">
            Отредактировано: {{ timeEdited }}
        </div>
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
        computed: {
            timeCreated() {
                return new Date(this.article.timeCreated).toLocaleString("ru",{
                    year: '2-digit',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: 'numeric',
                    second: 'numeric'
                });
            },
            timeEdited() {
                return !this.article.timeEdited ? null : new Date(this.article.timeEdited).toLocaleString("ru", {
                    year: '2-digit',
                    month: 'long',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: 'numeric',
                    second: 'numeric'
                });
                
            }
        },
    }
</script>

<style lang="less">
    .article-view {
        padding: 40px 0;
        &__dates {
            font-size: 14px;
            line-height: 1;
            color: #aaa;
            font-style: italic;
            margin-bottom: 20px;
            
        }
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