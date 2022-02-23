import java.util.Arrays;

public class Solution75 {
  public void sortColors(int[] nums) {
    if (nums.length < 2) {
      return;
    }
    int start = 0;
    int end = nums.length - 1;
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] != 0) {
        start = i;
        break;
      }
    }
    for (int i = end; i >= 0; i--) {
      if (nums[i] != 2) {
        end = i;
        break;
      }
    }
    int index = start;
    while (index <= end && index < nums.length && end >= 0) {
      if (nums[index] == 0) {
        nums[index] = nums[start];
        nums[start] = 0;
        while (nums[start] == 0) {
          start++;
          index++;
          if (start > end) {
            return;
          }
        }
      } else if (nums[index] == 1) {
        index++;
        continue;
      } else if (nums[index] == 2) {
        nums[index] = nums[end];
        nums[end] = 2;
        while (nums[end] == 2) {
          end--;
          if (start > end) {
            return;
          }
        }
      }
    }
    if (nums[end] == 0 && start < end) {
      nums[end] = nums[start];
      nums[start] = 0;
    }
  }

  public static void main(String[] args) {
    int[] ans = { 0, 1, 2, 0, 1, 2, 0, 1, 2 };
    new Solution75().sortColors(ans);
    System.out.println(Arrays.toString(ans));
  }
}
