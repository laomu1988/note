/**
 * 中序遍历二叉树，先左节点，然后自身值，然后右节点
 * */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    return root ? addNode(root, []) : [];
};
function addNode(node, arr) {
    node.left && addNode(node.left, arr);
    arr.push(node.val);
    node.right && addNode(node.right, arr);
    return arr;
}

/**不使用递归的解决方案*/
var inorderTraversal2 = function (root) {
    var arr = [], tempTree = root, tempArr = [];
    while (tempTree) {
        if (!tempTree.visited && tempTree.left) {
            tempTree.visited = true;
            tempArr.push(tempTree);
            tempTree = tempTree.left;
        } else {
            arr.push(tempTree.val);
            if (tempTree.right) {
                tempTree = tempTree.right;
            } else {
                tempTree = tempArr.pop();
            }
        }
    }
    return arr;
};

inorderTraversal2({val: 1, left: {val: 2}});