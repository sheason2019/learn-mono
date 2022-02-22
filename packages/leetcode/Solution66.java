import java.util.Arrays;

public class Solution66 {
  public int[] plusOne(int[] digits) {
    int point = digits.length - 1;
    boolean shouldCarry = false;
    do {
      shouldCarry = false;
      digits[point]++;
      if (digits[point] == 10) {
        digits[point] = 0;
        shouldCarry = true;
      }
      point--;
    } while (shouldCarry && point >= 0);
    if (shouldCarry) {
      int[] ans = new int[digits.length + 1];
      ans[0] = 1;
      for (int i = 0; i < digits.length; i++) {
        ans[i + 1] = digits[i];
      }
      return ans;
    }
    return digits;
  }

  public static void main(String[] args) {
    int[] ans = new Solution66().plusOne(new int[] { 4, 3, 2, 1 });
    System.out.println(Arrays.toString(ans));
  }
}
