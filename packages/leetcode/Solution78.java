import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution78 {
  public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> ans = new ArrayList<>();
    ans.add(new ArrayList<>());
    recursion(nums, ans, null);
    return ans;
  }

  public void recursion(int[] nums, List<List<Integer>> ans, List<Integer> existList) {
    for (int num : nums) {
      List<Integer> list;
      if (existList == null) {
        list = new ArrayList<>();
      } else {
        list = new ArrayList<>(existList);
        if (existList.get(existList.size() - 1) > num) {
          continue;
        }
      }
      list.add(num);
      ans.add(list);
      if (nums.length > 1) {
        int[] nextNums = new int[nums.length - 1];
        for (int i = 0, count = 0; i < nums.length; i++) {
          if (nums[i] != num) {
            nextNums[count++] = nums[i];
          }
        }
        recursion(nextNums, ans, list);
      }
    }
  }

  public static void main(String[] args) {
    List<List<Integer>> ans = new Solution78().subsets(new int[] { 1, 2, 3 });
    System.out.println('[');
    for (List<Integer> list : ans) {
      System.out.println(Arrays.toString(list.toArray()));
    }
    System.out.println(']');
  }
}
