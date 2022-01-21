public class Solution24 {
  public static class ListNode {
    int val;
    ListNode next;
    ListNode() { }
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
  public static ListNode swapPairs(ListNode head) {
    if (head == null) {
      return head;
    } else if (head.next == null) {
      return head;
    }
    boolean isOnHead = true;
    ListNode pointA = head, pointB = head.next, temp = null;
    while (true) {
      if (pointA == null || pointB == null) break;
      pointA.next = pointB.next;
      pointB.next = pointA;
      if (temp != null) {
        temp.next = pointB;
      }
      if (isOnHead) {
        isOnHead = false;
        head = pointB;
      }
      temp = pointA;
      pointA = pointA.next;
      if (pointA == null) break;
      pointB = pointA.next;
      if (pointB == null) break;
    }

    return head;
  }
  public static void main(String[] args) {
    ListNode test = new ListNode(1), point = test;
    point.next = new ListNode(2);
    point = point.next;
    point.next = new ListNode(3);
    point = point.next;
    point.next = new ListNode(4);
    test = swapPairs(test);
    point = test;
    while (point != null) {
      System.out.println(point.val);
      point = point.next;
    }

  }
}
