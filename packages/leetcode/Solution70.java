public class Solution70 {
  public int climbStairs(int n) {
    if (n < 2) {
      return n;
    }
    int[] climbWay = new int[n];
    climbWay[0] = 1;
    climbWay[1] = 2;
    for (int i = 2; i < n; i++) {
      climbWay[i] = climbWay[i - 2] + climbWay[i - 1];
    }
    return climbWay[n - 1];
  }
  public static void main(String[] args) {
    System.out.println(new Solution70().climbStairs(35));
  }
}
