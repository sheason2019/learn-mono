import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class Solution95 {
  class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
      this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }

  HashSet<String> set = new HashSet<>();

  public String strifyNode(TreeNode node) {
    StringBuilder builder = new StringBuilder();
    builder.append("{ val: " + node.val);
    if (node.left != null) {
      builder.append(", left: " + strifyNode(node.left));
    }
    if (node.right != null) {
      builder.append(", right: " + strifyNode(node.right));
    }
    builder.append(" }");
    return builder.toString();
  }

  public TreeNode copyNode(TreeNode source) {
    TreeNode head = new TreeNode(source.val);
    if (source.left != null) {
      head.left = copyNode(source.left);
    }
    if (source.right != null) {
      head.right = copyNode(source.right);
    }
    return head;
  }

  public void insertNode(TreeNode node, int val) {
    if (val < node.val) {
      if (node.left == null) {
        node.left = new TreeNode(val);
      } else {
        insertNode(node.left, val);
      }
    } else {
      if (node.right == null) {
        node.right = new TreeNode(val);
      } else {
        insertNode(node.right, val);
      }
    }
  }

  public List<TreeNode> generateTrees(int n) {
    List<TreeNode> ans = new ArrayList<>();
    int[] items = new int[n];

    for (int i = 0; i < items.length; i++) {
      items[i] = i + 1;
    }
    recursion(items, null, ans);
    return ans;
  }

  public void recursion(int[] items, TreeNode node, List<TreeNode> list) {
    if (items.length == 0) {
      String nodeStr = strifyNode(node);
      if (!set.contains(nodeStr)) {
        list.add(node);
        set.add(nodeStr);
      }
      return;
    }
    for (int i = 0; i < items.length; i++) {
      int[] nextItems = new int[items.length - 1];
      for (int j = 0, count = 0; j < items.length; j++) {
        if (j != i) {
          nextItems[count++] = items[j];
        }
      }
      if (node == null) {
        recursion(nextItems, new TreeNode(items[i]), list);
      } else {
        TreeNode nextNode = copyNode(node);
        insertNode(nextNode, items[i]);
        recursion(nextItems, nextNode, list);
      }
    }
  }

  public static void main(String[] args) {
    Solution95 s = new Solution95();
    List<TreeNode> ans = s.generateTrees(4);
    for (TreeNode node : ans) {
      System.out.println(s.strifyNode(node));
    }
  }
}
