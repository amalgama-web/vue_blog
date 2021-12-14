export const commentsService = {
    // return current node in comments tree, index of comment with passed id in this node, and child node of this comment
    getNodeData(list, commentId) {
        // if create root comment
        if (commentId === undefined) return {
            currentNodeList: null,
            indexInCurrentNode: null,
            childList: list
        };

        for (let i = 0; i < list.length; i++) {

            if (list[i].id === commentId) return {
                currentNodeList: list,
                indexInCurrentNode: i,
                childList: list[i].childComments
            };

            const result = this.getNodeData(list[i].childComments, commentId);
            if (result) return result;

        }
        return false;
    },
    countComments(list) {
        let counter = 0;
        for (let i = 0; i < list.length; i++) {
            counter++;
            counter += this.countComments(list[i].childComments);
        }
        return counter;
    }
};