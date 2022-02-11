export default {
    countComments(list) {
        let counter = 0;
        for (let i = 0; i < list.length; i++) {
            counter++;
            if(list[i].commentList) {
                counter += this.countComments(list[i].commentList);
            }
        }
        return counter;
    },
    findTargetList(commentList, branchNodes, currentDepth = 0) {
        if(currentDepth === branchNodes.length) return commentList;

        const commentNode = commentList.find(commentNode => commentNode.id === branchNodes[currentDepth]);

        return this.findTargetList(commentNode.commentList, branchNodes, ++currentDepth);
    }

};