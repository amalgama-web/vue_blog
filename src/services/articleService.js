export default {
    prepareArticlesList(articlesObject) {

        const articlesList = [];

        for(let id in articlesObject) {
            articlesList.push({
                id: id,
                ...articlesObject[id]
            });
        }

        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );
    },

    prepareUserFavoritesList(articlesList, articlesIdsList) {
        articlesList.forEach((item, index) => {
            item.id = articlesIdsList[index];
            item.timeCreated = Math.abs(item.timeCreated);
        });
        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );
    },

    prepareUserArticlesList(articlesObject) {
        const articlesList = this.prepareArticlesList(articlesObject);
        return articlesList.filter(articleItem => articleItem.timeCreated > 0);
    },

    prepareUserArchivedArticlesList(articlesObject) {
        const articlesList = this.prepareArticlesList(articlesObject)
            .filter(articleItem => articleItem.timeCreated < 0)
            .map(item => { item.timeCreated *= -1; return item;});
        return articlesList.sort((item1, item2) => item2.timeCreated - item1.timeCreated );

    },

    prepareArticle(articleObj, articleId) {

        articleObj.id = articleId;
        articleObj.commentsList = [];

        return articleObj;
    }
};