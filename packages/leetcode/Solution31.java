import java.util.Arrays;

public class Solution31 {
  public static void nextPermutation(int[] nums) {
    int temp = 0, loopStart = 0;
    boolean shouldReturn = false;
    for (int i = nums.length - 2; i > -1; i--) {
      for (int j = nums.length - 1; j > i; j--) {
        if (nums[j] > nums[i]) {
          temp = nums[j];
          nums[j] = nums[i];
          nums[i] = temp;
          loopStart = i;
          shouldReturn = true;
          break;
        }
      }
      if (shouldReturn)  break;
    }
    if (shouldReturn) {
      for (int i = loopStart; i < nums.length; i++) {
        for (int j = loopStart + 1; j < nums.length - 1; j++) {
          if (nums[j] > nums[j + 1]) {
            temp = nums[j];
            nums[j] = nums[j + 1];
            nums[j + 1] = temp;
          }
        }
      }
      return;
    }
    Arrays.sort(nums);
  }
  public static void main(String[] args) {
    int[] test = new int[]{ 1, 2, 3 };
    nextPermutation(test);
    for (int i : test) {
      System.out.println(i);
    }
  }
}
