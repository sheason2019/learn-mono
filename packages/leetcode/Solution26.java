public class Solution26 {
  public static int removeDuplicates(int[] nums) {
    if (nums.length < 2) return nums.length;
    int result = 1;
    for (int i = 0; i < nums.length - 1; i++) {
      if (nums[i] != nums[i + 1]) {
        nums[result++] = nums[i + 1];
      }
    }
    return result;
  }

  public static void main(String[] args) {
    int[] arr = new int[] { 1, 1, 2 };
    int test = removeDuplicates(arr);
    System.out.println(test);
    System.out.print("[");
    for (int i : arr) {
      System.out.print(i + ", ");
    }
    System.out.println("]");
  }
}
