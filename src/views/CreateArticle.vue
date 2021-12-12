<template>
    <section class="l-container">
        
        <router-link to="/">
            <div class="button">← К списку статей</div>
        </router-link>
        
        <div class="create-article">
            <div class="create-article__head">Создать новую запись</div>
            <form-edit-article></form-edit-article>
        </div>
        
    </section>
</template>

<script>
    import FormEditArticle from '../components/form-edit-article'

    export default {
        components: {
            FormEditArticle
        }
    }
</script>

<style lang="less">
    .create-article {
        padding: 40px 0;
        max-width: 500px;
        
        &__head {
            font-size: 30px;
            margin-bottom: 30px;
        }
    }
</style>

