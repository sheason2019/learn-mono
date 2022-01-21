import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class Solution47 {
  public List<List<Integer>> permuteUnique(int[] nums) {
    Arrays.sort(nums);
    HashSet<String> existSet = new HashSet<String>();
    return recursion(new ArrayList<>(), nums, existSet);
  }

  public List<List<Integer>> recursion(List<List<Integer>> source, int[] nums, HashSet<String> existSet) {
    if (nums.length == 0) {
      return source;
    }
    List<List<Integer>> nextSource = new ArrayList<>();
    int[] nextNums = new int[nums.length - 1];
    for (int i = 1; i < nums.length; i++) {
      nextNums[i - 1] = nums[i];
    }
    // 初始化
    if (source.size() == 0) {
      List<Integer> init = new ArrayList<>();
      init.add(nums[0]);
      nextSource.add(init);
      return recursion(nextSource, nextNums, existSet);
    } else {
      for (int i = 0; i < source.size(); i++) {
        List<Integer> originList = source.get(i);
        for (int j = 0; j <= originList.size(); j++) {
          List<Integer> branchList = new ArrayList<>(originList);
          branchList.add(j, nums[0]);
          String str = branchList.toString();
          if (!existSet.contains(str)) {
            nextSource.add(branchList);
            existSet.add(str);
          }
        }
      }
      return recursion(nextSource, nextNums, existSet);
    }
  }

  public static void main(String[] args) {
    Solution47 s = new Solution47();
    System.out.println(s.permuteUnique(new int[] {}));
  }
}
