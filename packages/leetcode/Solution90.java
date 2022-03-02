import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution90 {
  public List<List<Integer>> subsetsWithDup(int[] nums) {
    List<List<Integer>> ans = new ArrayList<>();
    Arrays.sort(nums);
    ans.add(new ArrayList<>());
    recursion(nums, 0, new ArrayList<>(), ans);
    return ans;
  }

  public void recursion(int[] nums, int index, List<Integer> useList, List<List<Integer>> ans) {
    int lastNum = 77;
    for (int i = index; i < nums.length; i++) {
      if (nums[i] == lastNum) {
        continue;
      } else {
        List<Integer> nextList = new ArrayList<>(useList);
        nextList.add(nums[i]);
        ans.add(nextList);
        lastNum = nums[i];
        recursion(nums, i + 1, nextList, ans);
      }
    }
  }

  public static void main(String[] args) {
    Solution90 s = new Solution90();
    System.out.println(s.subsetsWithDup(new int[] { 1, 2, 2, 2, 2, 2 }));
  }
}
