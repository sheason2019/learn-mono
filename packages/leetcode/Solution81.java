public class Solution81 {
  public boolean search(int[] nums, int target) {
    boolean reverse = false;
    if (target < nums[0]) {
      reverse = true;
    } else if (target == nums[0] || target == nums[nums.length - 1]) {
      return true;
    }

    for (int i = 0; i < nums.length; i++) {
      if (reverse) {
        int num = nums[nums.length - i - 1];
        if (num < target) {
          return false;
        } else if (num == target) {
          return true;
        }
      } else {
        int num = nums[i];
        if (num > target) {
          return false;
        } else if (num == target) {
          return true;
        }
      }
    }
    return false;

  }

  public static void main(String[] args) {
    System.out.println(new Solution81().search(new int[] { 3, 1 }, 3));
  }
}
