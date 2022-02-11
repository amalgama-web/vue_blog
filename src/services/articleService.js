
function prepareComments(commentsObj) {
    let commentList = [];

    for(let commentId in commentsObj) {
        commentsObj[commentId].commentList = prepareComments(commentsObj[commentId].commentList);

        commentList.push({
            id: commentId,
            ...commentsObj[commentId]
        });
    }

    return commentList;

}

export default {
    prepareArticlesList(articlesObject) {

        let articlesList = [];

        for(let id in articlesObject) {
            articlesObject[id].commentList = prepareComments(articlesObject[id].commentList);
            articlesList.push({
                id: id,
                ...articlesObject[id]
            });
        }

        return articlesList.reverse();
    },

    prepareArticle(articleObj, articleId) {

        articleObj.id = articleId;
        articleObj.commentList = prepareComments(articleObj.commentList);

        return articleObj;
    }
};