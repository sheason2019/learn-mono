public class Solution55 {
  public boolean canJump(int[] nums) {
    int canReach = nums[0];
    int point = 0;
    while (point <= canReach && canReach < nums.length) {
      int reach = point + nums[point];
      if (reach > canReach) {
        canReach = reach;
      }
      point++;
    }
    return canReach >= nums.length - 1;
  }

  public static void main(String[] args) {
    Solution55 s = new Solution55();
    System.out.println(s.canJump(new int[] { 3, 2, 1, 0, 4 }));
  }
}
