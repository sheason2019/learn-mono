public class Solution29 {
  public static int divide(int dividend, int divisor) {
    boolean isNagative = false;
    long divisor_long = divisor;
    if (dividend < 0) {
      isNagative = !isNagative;
    }
    if (divisor < 0) {
      isNagative = !isNagative;
      divisor_long = Math.abs((long) divisor);
    }
    char[] char_dividend_abs = String.valueOf(Math.abs(dividend)).toCharArray();
    int[] dividend_abs = new int[char_dividend_abs.length];
    for (int i = 0; i < char_dividend_abs.length; i++) {
      if (char_dividend_abs[i] == '-') continue;
      dividend_abs[i] = Integer.valueOf(char_dividend_abs[i] - '0');
    }

    int result[] = new int[char_dividend_abs.length];
    long part_divident = 0, divisor_abs = Math.abs(divisor_long);
    for (int i = 0; i < dividend_abs.length; i++) {
      if (part_divident == 0) {
        part_divident = dividend_abs[i];
      } else {
        part_divident = Long.valueOf(String.valueOf(part_divident) + String.valueOf(dividend_abs[i]));
      }
      while (part_divident >= divisor_abs) {
        part_divident -= divisor_abs;
        result[i]++;
      }
    }
    StringBuilder sb = new StringBuilder();
    if (isNagative) sb.append("-");
    for (int i : result) {
      sb.append(i);
    }
    long pre_result = Long.valueOf(sb.toString());
    if (pre_result > Integer.MAX_VALUE) {
      return Integer.MAX_VALUE;
    } else if (pre_result < Integer.MIN_VALUE) {
      return Integer.MIN_VALUE;
    } else {
      return Integer.valueOf(sb.toString());
    }
  }
  public static void main(String[] args) {
    int test = divide(Integer.MIN_VALUE / 2, Integer.MIN_VALUE);
    System.out.println(test);
  }
}
