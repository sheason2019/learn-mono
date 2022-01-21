public class Solution35 {
  public static int searchInsert(int[] nums, int target) {
    // 首先考虑边界情况
    if (nums.length == 0 || nums[0] >= target) {
      return 0;
    }
    if (nums[nums.length - 1] < target) {
      return nums.length;
    }
    if (nums[nums.length - 1] == target) {
      return nums.length - 1;
    }
    return recursion(0, nums.length - 1, nums.length / 2, nums, target);
  }
  public static int recursion(int left, int right, int center, int[] nums, int target) {
    if (nums[center] == target) {
      return center;
    }
    if (nums[left] < target && nums[right] > target && right - left < 2) {
      return right;
    }
    if (nums[center] < target) {
      return recursion(center, right, (center + right) / 2, nums, target);
    } else {
      return recursion(left, center, (left + center) / 2, nums, target);
    }
  }
  public static void main(String[] args) {
    int[] test = new int[]{1, 3, 5, 6};
    System.out.println(searchInsert(test, 2));
  }
}
