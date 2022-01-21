public class Solution21 {
  public class ListNode {
    int val;
    ListNode next;
    ListNode() { }
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
  public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode result = null, pr = null, p1 = l1, p2 = l2;
    while (true) {
      ListNode value = null;
      boolean shouldBreak = false;
      if (p1 == null) {
        value = p2;
        shouldBreak = true;
      } else if (p2 == null) {
        value = p1;
        shouldBreak = true;
      } else {
        if (p1.val < p2.val) {
          value = p1;
          p1 = p1.next;
        } else {
          value = p2;
          p2 = p2.next;
        }
      }
      // 赋值
      if (result == null) {
        result = value;
        pr = result;
      } else {
        pr.next = value;
        pr = pr.next;
      }
      if (shouldBreak) {
        break;
      }
    }
    return result;
  }
  public static void main(String[] args) {
    
  }
}
