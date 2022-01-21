public class Solution32 {
  public static int longestValidParentheses(String s) {
    int result = 0;
    char[] chars = s.toCharArray();
    for (int i = 0; i < chars.length - result; i++) {
      int open = 0, close = 0;
      for (int j = i; j < chars.length; j++) {
        if (chars[j] == '(') open++;
        if (chars[j] == ')') close++;
        if (open == close) {
          if (2 * open > result)  result = 2 * open;
        } else if (close > open) {
          break;
        }
      }
    }
    return result;
  }
  public static void main(String[] args) {
    int test = longestValidParentheses(")()())");
    System.out.println(test);
  }
}
