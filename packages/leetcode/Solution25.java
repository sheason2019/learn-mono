import java.util.ArrayList;
import java.util.Collections;

public class Solution25 {
  public static class ListNode {
    int val;
    ListNode next;
    ListNode() { }
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
  public static ListNode reverseKGroup(ListNode head, int k) {
    if (head == null) return head;
    else if (head.next == null) return head;

    ArrayList<ListNode> list = new ArrayList<>();
    ListNode point = head, lastPoint = null;
    boolean shouldBreak = false;
    while (point != null) {
      for (int i = 0; i < k; i++) {
        list.add(point);
        point = point.next;
        if (point == null) {
          shouldBreak = true;
          break;
        }
      }
      if (shouldBreak && list.size() != k) break;

      Collections.reverse(list);
      for (ListNode node : list) {
        if (lastPoint == null) {
          head = node;
        } else {
          lastPoint.next = node;
        }
        lastPoint = node;
      }
      lastPoint.next = point;
      list.clear();
    }

    return head;
  }
  public static void main(String[] args) {
    ListNode test = new ListNode(1), point;
    point = test;
    for (int i = 2; i <= 5; i++) {
      point.next = new ListNode(i);
      point = point.next;
    }
    test = reverseKGroup(test, 2);
    point = test;
    while (point != null) {
      System.out.println(point.val);
      point = point.next;
    }
  }
}
