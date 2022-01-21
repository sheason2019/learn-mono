public class Solution53 {
  public int maxSubArray(int[] nums) {
    int max = Integer.MIN_VALUE, current = 0;
    for (int num : nums) {
      current += num;
      if (current < num) {
        current = num;
      }
      if (current > max) {
        max = current;
      }
    }
    return max;
  }

  public static void main(String[] args) {
    Solution53 s = new Solution53();
    System.out.println(s.maxSubArray(new int[] { 5, 4, -1, 7, 8 }));
  }
}
