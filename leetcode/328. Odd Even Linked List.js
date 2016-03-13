/**Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

 You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.

 Example:
 Given 1->2->3->4->5->NULL,
 return 1->3->5->2->4->NULL.

 Note:
 The relative order inside both the even and odd groups should remain as it was in the input.
 The first node is considered odd, the second node even and so on ...
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    var even = {}, evenStart = even, isEven = true, odd = head, node = head ? head.next : null;
    while (node) {
        if (isEven) {
            even.next = node;
            even = node;
        } else {
            odd.next = node;
            odd = node;
        }
        node = node.next;
        isEven = !isEven;
    }
    even.next = null;
    odd.next = null;
    if (evenStart.next) {
        odd.next = evenStart.next;
    }

    return head;
};

console.log(oddEvenList({val: 1, next: {val: 2, next: {val: 3}}}));
