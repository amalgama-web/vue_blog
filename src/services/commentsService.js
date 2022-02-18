export default {
    countCommentsInTree(list) {
        let counter = 0;
        for (let i = 0; i < list.length; i++) {
            counter++;
            if(list[i].commentsList) {
                counter += this.countCommentsInTree(list[i].commentsList);
            }
        }
        return counter;
    },

    prepareCommentsFlatList(commentsObj) {
        const commentsFlatList = [];

        for(let id in commentsObj) {
            commentsFlatList.push({
                id: id,
                commentsList: [],
                ...commentsObj[id],
            });
        }

        return commentsFlatList.sort((item1, item2) => item1.timeCreated - item2.timeCreated );
    },

    createCommentsTreeList(commentsFlatList) {
        const commentsTreeList = [];

        commentsFlatList.forEach(commentItem => {

            // is root comment
            if(commentItem.parentCommentId === undefined) {
                commentsTreeList.push(commentItem);
                return;
            }

            // is child comment
            const parentComment = commentsFlatList.find(comment => comment.id === commentItem.parentCommentId);
            if (parentComment) parentComment.commentsList.push(commentItem);


        });

        return commentsTreeList;
    }

};