public class Solution86 {
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

  public ListNode partition(ListNode head, int x) {
    if (head == null) {
      return null;
    }
    ListNode prev = null, prevPoint = null, suffix = null, suffixPoint = null, point = head;
    while (point != null) {
      if (point.val < x) {
        if (prev == null) {
          prev = point;
          prevPoint = prev;
        } else {
          prevPoint.next = point;
          prevPoint = prevPoint.next;
        }
      } else {
        if (suffix == null) {
          suffix = point;
          suffixPoint = suffix;
        } else {
          suffixPoint.next = point;
          suffixPoint = suffixPoint.next;
        }
      }
      point = point.next;
    }
    if (prev == null) {
      prev = head;
    } else if (suffix != null) {
      prevPoint.next = suffix;
      suffixPoint.next = null;
    }
    return prev;
  }

  public static void main(String[] args) {
    Solution86 s = new Solution86();
    ListNode list = s.generateListNodeByArray(new int[] { 1, 4, 3, 2, 5, 2 });
    list = s.partition(list, 3);
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
