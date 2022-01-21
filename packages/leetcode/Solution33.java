public class Solution33 {
  public static int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1, center = nums.length / 2;
    if (nums[left] == target) return left;
    if (nums[right] == target) return right;
    return recursion(left, right, center, nums, target);
  }
  public static int recursion(int left, int right, int center, int[] nums, int target) {
    if (nums[center] == target) {
      return center;
    }
    if (right - left < 2) {
      return -1;
    }
    if (nums[left] > nums[center]) {
      // 旋转点在中心点左边
      if (nums[center] < target) {
        if (target < nums[left]) {
          return recursion(center, right, (right + center) / 2, nums, target);
        } else {
          return recursion(left, center, (center + left) / 2, nums, target);
        }
      } else {
        return recursion(left, center, (center + left) / 2, nums, target);
      }
    } else if (nums[right] < nums[center]) {
      // 旋转点在中心点右边
      if (nums[center] < target) {
        return recursion(center, right, (right + center) / 2, nums, target);
      } else {
        if (target < nums[right]) {
          return recursion(center, right, (right + center) / 2, nums, target);
        } else {
          return recursion(left, center, (center + left) / 2, nums, target);
        }
      }
    } else {
      // 无旋转点，数组以升序排列
      if (nums[center] < target) {
        return recursion(center, right, (right + center) / 2, nums, target);
      } else {
        return recursion(left, center, (center + left) / 2, nums, target);
      }
    }
  }
  public static void main(String[] args) {
    int[] test = new int[]{4, 5, 6, 7, 0, 1, 2};
    System.out.println(search(test, 0));
  }
}
