public class Solution98 {
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

  public TreeNode getTreeNode() {
    return new TreeNode(Integer.MIN_VALUE, null, new TreeNode(Integer.MAX_VALUE));
  }

  public boolean isValidBST(TreeNode root) {
    return recursion(root, Integer.MAX_VALUE + 1L, Integer.MIN_VALUE - 1L);
  }

  public boolean recursion(TreeNode node, long max, long min) {
    if (node.left != null) {
      long nextMax = max;
      if (node.val < max) {
        nextMax = node.val;
      }
      if (node.left.val >= node.val || !recursion(node.left, nextMax, min)) {
        return false;
      }
    }
    if (node.right != null) {
      long nextMin = min;
      if (node.val > min) {
        nextMin = node.val;
      }
      if (node.right.val <= node.val || !recursion(node.right, max, nextMin)) {
        return false;
      }
    }
    if (node.val >= max || node.val <= min) {
      return false;
    }
    return true;
  }

  public static void main(String[] args) {
    Solution98 s = new Solution98();
    TreeNode head = s.getTreeNode();
    System.out.println(s.isValidBST(head));
  }
}
