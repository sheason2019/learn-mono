public class Solution41 {
  public static int firstMissingPositive(int[] nums) {
    int temp;
    for (int i = 0; i < nums.length; i++) {
      while (nums[i] > 0 && nums[i] < nums.length) {
        if (nums[i] != i + 1 && nums[i] != nums[nums[i] - 1]) {
          temp = nums[i];
          nums[i] = nums[temp - 1];
          nums[temp - 1] = temp;
        } else {
          break;
        }
      }
    }
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] != i + 1) return i + 1;
    }
    return nums.length + 1;
  }
  public static void main(String[] args) {
    System.out.println(firstMissingPositive(new int[]{1, 1}));
  }
}
