public class Solution100 {
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

  public TreeNode getTreeNode(int i) {
    if (i == 0)
      return new TreeNode(1, new TreeNode(2), new TreeNode(1));
    return new TreeNode(1, new TreeNode(1), new TreeNode(2));
  }

  public boolean isSameTree(TreeNode p, TreeNode q) {
    if ((p == null && q != null) || (p != null && q == null)) {
      return false;
    }
    if (p != null && q != null) {
      if (p.val != q.val) {
        return false;
      }
      if (!isSameTree(p.left, q.left) || !isSameTree(p.right, q.right)) {
        return false;
      }
    }
    return true;
  }

  public static void main(String[] args) {
    Solution100 s = new Solution100();
    TreeNode p = s.getTreeNode(0), q = s.getTreeNode(1);
    System.out.println(s.isSameTree(p, q));
  }
}
