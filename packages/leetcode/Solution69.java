public class Solution69 {
  /** 牛顿迭代法 https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division  */
  public int mySqrt(int x) {
    int x0 = x / 2;

    if (x > 1) {
      int x1 = (x0 + x / x0) / 2;
      while (x0 > x1) {
        x0 = x1;
        x1 = (x0 + x / x0) / 2;
      }
      return x0;
    } else {
      return x;
    }
  }
  public static void main(String[] args) {
    System.out.println(new Solution69().mySqrt(1));
  }
}
