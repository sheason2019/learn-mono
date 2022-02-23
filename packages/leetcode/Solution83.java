public class Solution83 {
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
    ListNode ans = head, ansEnd = ans, point = head;
    int dupliVal = -999;
    while (point != null) {
      if (point.next == null) {
        if (point.val == dupliVal) {
          ansEnd.next = null;
        } else {
          ansEnd.next = point;
        }
        break;
      } else {
        if (point.val == point.next.val) {
          dupliVal = point.val;
        } else {
          ansEnd.next = point.next;
          ansEnd = ansEnd.next;
        }
        point = point.next;
      }
    }
    ansEnd.next = null;
    return ans;
  }

  public static void main(String[] args) {
    Solution83 s = new Solution83();
    ListNode list = s.generateListNodeByArray(new int[] { 1, 1, 2, 3, 3 });
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
