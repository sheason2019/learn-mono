import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution99 {
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

  public TreeNode getTreeNode() {
    return new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2), null));
  }

  public void recoverTree(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    recursion(root, list, 0);
    Collections.sort(list);
    recursion(root, list, 1);
  }

  public void recursion(TreeNode node, List<Integer> list, int type) {
    if (node.left != null) {
      recursion(node.left, list, type);
    }
    if (type == 0) {
      list.add(node.val);
    } else {
      node.val = list.remove(0);
    }

    if (node.right != null) {
      recursion(node.right, list, type);
    }
  }

  public static void main(String[] args) {
    Solution99 s = new Solution99();
    TreeNode node = s.getTreeNode();
    s.recoverTree(node);
    System.out.println(s.strifyNode(node));
  }
}
