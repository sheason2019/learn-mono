
public class Solution61 {

  public ListNode rotateRight(ListNode head, int k) {
    if (head == null) {
      return null;
    }
    ListNode point = head;
    int length = 1;
    while (point.next != null) {
      length++;
      point = point.next;
    }
    k = k % length;
    if (k == 0) {
      return head;
    }
    point.next = head;
    point = head;
    for (int i = 0; i < length - (k + 1); i++) {
      point = point.next;
    }
    head = point.next;
    point.next = null;
    return head;
  }

  public static void main(String[] args) {
    ListNode head = new ListNode(1, new ListNode(2));
  
    ListNode point = head;

    Solution61 s = new Solution61();
    head = s.rotateRight(head, 1);
    point = head;

    System.out.print("[");
    while(point != null) {
      System.out.print(point.val);
      if (point.next != null) {
        System.out.print(", ");
      }
      point = point.next;
    }
    System.out.println("]");
  }
}

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