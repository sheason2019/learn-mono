import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution94 {
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

  TreeNode getNode() {
    TreeNode head = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));

    return head;
  }

  public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> ans = new ArrayList<>();
    traversal(ans, root);
    return ans;
  }

  public void traversal(List<Integer> ans, TreeNode node) {
    if (node == null) {
      return;
    }
    traversal(ans, node.left);
    ans.add(node.val);
    traversal(ans, node.right);
  }

  public static void main(String[] args) {
    Solution94 s = new Solution94();
    List<Integer> ans = s.inorderTraversal(s.getNode());
    System.out.println(Arrays.toString(ans.toArray()));
  }
}
