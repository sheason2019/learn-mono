import java.util.Stack;

public class Solution92 {
  class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
      this.val = val;
    }

    ListNode(int val, ListNode next) {
      this.val = val;
      this.next = next;
    }
  }

  ListNode generateListNodeByArray(int[] array) {
    ListNode head = new ListNode(array[0]);
    ListNode point = head;
    for (int i = 1; i < array.length; i++) {
      point.next = new ListNode(array[i]);
      point = point.next;
    }
    return head;
  }

  public ListNode reverseBetween(ListNode head, int left, int right) {
    if (left == right) {
      return head;
    }
    Stack<ListNode> s = new Stack<>();
    int index = 1;
    ListNode start = null, point = head, end = null;
    while (point != null) {
      if (index == left - 1) {
        start = point;
      }
      if (index == right + 1) {
        end = point;
      }
      if (index >= left && index <= right) {
        s.push(point);
      }
      index++;
      point = point.next;
    }
    if (start == null) {
      head = s.pop();
      point = head;
    } else {
      point = start;
    }
    while(!s.isEmpty()) {
      point.next = s.pop();
      point = point.next;
    }
    if (end != null) {
      point.next = end;
    } else {
      point.next = null;
    }

    return head;
  }

  public static void main(String[] args) {
    Solution92 s = new Solution92();
    ListNode list = s.generateListNodeByArray(new int[] { 3, 5 });
    list = s.reverseBetween(list, 1, 2);
    System.out.print('[');
    while (list != null) {
      System.out.print(list.val);
      if (list.next != null) {
        System.out.print(", ");
      }
      list = list.next;
    }
    System.out.println(']');
  }
}
