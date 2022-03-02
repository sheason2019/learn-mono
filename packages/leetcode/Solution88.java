import java.util.Arrays;

public class Solution88 {
  public void merge(int[] nums1, int m, int[] nums2, int n) {
    int point = nums1.length - 1;
    int p1 = m - 1, p2 = n - 1;
    while (p1 >= 0 || p2 >= 0) {
      if (p2 < 0) {
        return;
      }
      if (p1 >= 0) {
        if (nums1[p1] < nums2[p2]) {
          nums1[point--] = nums2[p2--];
        } else {
          nums1[point--] = nums1[p1];
          nums1[p1--] = 0;
        }
      } else {
        nums1[point--] = nums2[p2--];
      }
    }
  }

  public static void main(String[] args) {
    int[] nums1 = { 1, 2, 3, 0, 0, 0 };
    int[] nums2 = { 2, 5, 6 };
    new Solution88().merge(nums1, 3, nums2, 3);
    System.out.println(Arrays.toString(nums1));
  }
}
