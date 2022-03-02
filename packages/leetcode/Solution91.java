public class Solution91 {
  public int numDecodings(String s) {
    int ans = 0;
    char[] chars = s.toCharArray();

    if (chars[0] == '0') {
      return 0;
    } else if (chars.length == 1) {
      return 1;
    }

    int ll = 1;
    int l = 1;
    for (int i = 1; i < chars.length; i++) {
      if (chars[i] == '0') {
        if (chars[i - 1] == '0' || (chars[i - 1] <= '9' && chars[i - 1] >= '3')) {
          return 0;
        } else {
          ans = ll;
        }
      } else {
        int calc = (chars[i - 1] - '0') * 10 + (chars[i] - '0');
        if (calc <= 26) {
          if (chars[i - 1] == '0') {
            ans = l;
          } else {
            ans = ll + l;
          }
        } else {
          ans = l;
        }
      }
      ll = l;
      l = ans;
    }
    return ans;
  }

  public static void main(String[] args) {
    System.out.println(new Solution91().numDecodings("1"));
  }
}
