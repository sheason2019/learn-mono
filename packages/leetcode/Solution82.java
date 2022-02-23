public class Solution82 {
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

  public ListNode deleteDuplicates(ListNode head) {
    if (head == null) {
      return null;
    }
    ListNode ans = null, point = head, ansEnd = null;
    int dupliVal = -999;
    while (point != null) {
      if (point.next == null && point.val == dupliVal && ans != null) {
        ansEnd.next = null;
      }
      if (point.val == dupliVal) {
        point = point.next;
        continue;
      }
      if (point.next == null || point.next.val != point.val) {
        if (ans == null) {
          ans = point;
          ansEnd = ans;
        } else {
          ansEnd.next = point;
          ansEnd = ansEnd.next;
        }
      } else {
        dupliVal = point.val;
      }
      point = point.next;
    }
    return ans;
  }

  public static void main(String[] args) {
    Solution82 s = new Solution82();
    ListNode list = s.generateListNodeByArray(new int[] { 1, 1 });
    list = s.deleteDuplicates(list);
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
