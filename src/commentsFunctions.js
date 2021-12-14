export const commentsFunctions = {
    findCommentListInTree(list, parentId) {
        if (parentId === undefined) return list;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === parentId) return list[i].childComments;
            const result = this.findCommentListInTree(list[i].childComments, parentId);
            if (result) return result;
        }
        return false;
    },
    findCommentInTree(list, commentId) {
        for (let i = 0; i < list.length; i++) {

            if (list[i].id === commentId) return { list: list, index: i };

            const result = this.findCommentInTree(list[i].childComments, commentId);
            if (result) return result;

        }
        return false;
    }
};