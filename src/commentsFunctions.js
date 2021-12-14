export const commentsFunctions = {
    findCommentListInTree(currentList, parentId) {
        if (parentId === undefined) return currentList;
        for ( let i = 0; i < currentList.length; i++ ) {
            if (currentList[i].id === parentId) return currentList[i].childComments;
            const result = this.findCommentListInTree(currentList[i].childComments, parentId);
            if (result) return result;
        }
        return false;
    }
};