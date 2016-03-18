/**
 * 前序遍历二叉树
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
 *
 * 使用递归的解决方案
 */
var preorderTraversal = function (root) {
    return root ? addNode(root, []) : [];
};
function addNode(node, arr) {
    arr.push(node.val);
    node.left && addNode(node.left, arr);
    node.right && addNode(node.right, arr);
    return arr;
}

/**不使用递归的解决方案*/
var preorderTraversal2 = function (root) {
    var arr = [], tempTree = root, tempArr = [];
    while (tempTree) {
        arr.push(tempTree.val);
        if (tempTree.right) {
            tempArr.push(tempTree.right);
        }
        if (tempTree.left) {
            tempTree = tempTree.left;
        } else {
            tempTree = tempArr.pop();
        }
    }
    return arr;
}