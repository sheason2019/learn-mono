import java.util.Arrays;
import java.util.HashMap;

public class Solution23 {
  public static class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
  }
  public static ListNode mergeKLists(ListNode[] lists) {
    ListNode result = new ListNode(), point = result;
    HashMap<Integer, Integer> resultMap = new HashMap<Integer, Integer>();
    for (ListNode node : lists) {
      while (node != null) {
        if (resultMap.containsKey(node.val)) {
          resultMap.put(node.val, resultMap.get(node.val) + 1);
        } else {
          resultMap.put(node.val, 1);
        }
        node = node.next;
      }
    }
    Object[] keyArray = resultMap.keySet().toArray();
    Integer[] loopArray = new Integer[keyArray.length];
    for (int i = 0; i < keyArray.length; i++) {
      loopArray[i] = Integer.valueOf(keyArray[i].toString());
    }
    Arrays.sort(loopArray);
    for (Integer key : loopArray) {
      for (int loop = 0; loop < resultMap.get(key); loop++) {
        point.next = new ListNode(key);
        point = point.next;
      }
    }

    return result.next;
  }
  public static void main(String[] args) {
    ListNode head = null;
    ListNode head2 = new ListNode(-2);
    ListNode head3 = new ListNode(-3), point = head3;
    point.next = new ListNode(-2);
    point = point.next;
    point.next = new ListNode(-1);

    ListNode[] list = new ListNode[] { head, head2, head3 };
    mergeKLists(list);
  }
}
