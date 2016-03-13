/*
 Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

 According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”

 _______6______
 /              \
 ___2__          ___8__
 /      \        /      \
 0      _4       7       9
 /  \
 3   5
 For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6. Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

 二叉树查找共同祖先
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root == p || root == q) {
        return root;
    }
    if(p == q){
        return p;
    }
    var tempTree = root, tempArr = [];
    while (tempTree) {
        if (tempTree.right) {
            tempTree.right.parent = tempTree;
            tempArr.push(tempTree.right);
        }
        if (tempTree.left) {
            tempTree.left.parent = tempTree;
            tempTree = tempTree.left;
        } else {
            tempTree = tempArr.pop();
        }
        if (p.parent && q.parent) {
            break;
        }
    }
    tempArr = [];
    while (p != root) {
        tempArr.push(p);
        p = p.parent;
    }
    tempArr.push(root);
    while (tempArr.indexOf(q) < 0) {
        q = q.parent;
    }

    return q;
};


var root = {val: 1, left: {val: 2, right: {val: 3}}, right: {val: 4, left: {val: 8}, right: {val: 7}}};

console.log(lowestCommonAncestor(root,root.right.right,root.right.right));
