public class Solution19 {
  public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
  public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode NodeFindEnd = head, NodeReplace = head;
    boolean isNodeReplaceMounted = false;
    if (n == 1 && head.next == null) {
      return null;
    }
    while (true) {
      if (!isNodeReplaceMounted) n--;
      if (n < 0 && !isNodeReplaceMounted) {
        NodeReplace = head;
        isNodeReplaceMounted = true;
      }
      if (NodeFindEnd.next == null && NodeReplace.next != null && isNodeReplaceMounted) {
        NodeReplace.next = NodeReplace.next.next;
        break;
      } else if (NodeFindEnd.next == null && NodeReplace.next != null && !isNodeReplaceMounted) {
        head = head.next;
        break;
      } else {
        NodeFindEnd = NodeFindEnd.next;
        if (isNodeReplaceMounted) {
          NodeReplace = NodeReplace.next;
        }
      }
    }
    return head;
  }
  public static void main(String[] args) {
    
  }
}
