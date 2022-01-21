import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class Solution18 {
  public static List<List<Integer>> fourSum(int[] nums, int target) {
    if (nums.length < 4)
      return new ArrayList<>();
    List<List<Integer>> result = new ArrayList<>();
    HashSet<List<Integer>> sites = new HashSet<>();
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 3; i++) {
      int ll = i, l = 1, rr = nums.length - 1, r = rr - 1;
      while (rr - ll > 2) {
        l = ll + 1;
        r = rr - 1;
        int loopTarget = target - (nums[ll] + nums[rr]);
        while (l < r) {
          int calc = nums[l] + nums[r];
          boolean shouldBreak = true;
          if (calc == loopTarget) {
            List<Integer> partOfResult = new ArrayList<Integer>();
            partOfResult.add(nums[ll]);
            partOfResult.add(nums[l]);
            partOfResult.add(nums[r]);
            partOfResult.add(nums[rr]);
            sites.add(partOfResult);
          }
          if (calc < loopTarget) {
            for (int offset = 1; offset < r - l; offset++) {
              if (nums[l] != nums[l + offset]) {
                l += offset;
                shouldBreak = false;
                break;
              }
            }
          } else {
            for (int offset = 1; offset < r - l; offset++) {
              if (nums[r] != nums[r - offset]) {
                r -= offset;
                shouldBreak = false;
                break;
              }
            }
          }
          if (shouldBreak) {
            break;
          } else {
            continue;
          }
        }
        boolean shouldBreak = true;
        for (int offset = 1; offset < rr - ll; offset++) {
          if (nums[rr] != nums[rr - offset]) {
            rr -= offset;
            shouldBreak = false;
            break;
          }
        }
        if (shouldBreak) {
          break;
        }
      }
    }
    for (List<Integer> i : sites) {
      result.add(i);
    }
    return result;
  }

  public static void main(String[] args) {
    System.out.println(fourSum(new int[] { -3, -2, -1, 0, 0, 1, 2, 3 }, 0).toString());
  }
}
