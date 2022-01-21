public class Solution27 {
  public static int removeElement(int[] nums, int val) {
    int result = 0;
    for (int i = 0; i < nums.length - result; i++) {
      if (nums[i] == val) {
        result++;
        while (nums[nums.length - result] == val) {
          if (nums.length - result <= i) return nums.length - result;
          result++;
        }
        nums[i] = nums[nums.length - result];
        nums[nums.length - result] = val;
      }
    }
    return nums.length - result;
  }
  public static void main(String[] args) {
    int[] nums = new int[]{  };
    int test = removeElement(nums, 2);
    System.out.println(test);
    System.out.print("[");
    for (int i : nums) {
      System.out.print(i + ", ");
    }
    System.out.println("]");
  }
}
