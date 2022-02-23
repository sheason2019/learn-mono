import java.util.Arrays;

public class Solution80 {
  public int removeDuplicates(int[] nums) {
    int count = 0;
    int last = nums[0];
    int inputPoint = 0;
    int index = 0;
    while (index < nums.length) {
      if (nums[index] == last) {
        count++;
        if (count < 3) {
          nums[index] = nums[inputPoint];
          nums[inputPoint] = last;
          inputPoint++;
        }
      } else {
        count = 1;
        last = nums[index];
        nums[index] = nums[inputPoint];
        nums[inputPoint] = last;
        inputPoint++;
      }
      index++;
    }
    return inputPoint;
  }

  public static void main(String[] args) {
    int[] nums = { 1, 1, 1, 2, 2, 3 };
    System.out.println(new Solution80().removeDuplicates(nums));
    System.out.println(Arrays.toString(nums));
  }
}
