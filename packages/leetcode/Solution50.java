public class Solution50 {
  public double myPow(double x, int n) {
    if (x == 1) {
      return 1;
    } else if (x == -1) {
      if ((n & 1) == 1) {
        return -1;
      } else {
        return 1;
      }
    }
    if (n == Integer.MIN_VALUE) {
      return 0;
    }
    double xx = x;
    double ans = 1;
    if (n < 0) {
      xx = 1 / x;
      n = -n;
    } else if (n == 0) {
      return 1;
    }
    for (int i = 0; i < n; i++) {
      ans = ans * xx;
    }
    return ans;
  }
  public static void main(String[] args) {
    Solution50 s = new Solution50();
    System.out.println(s.myPow(2, -2147483647));
  }
}
