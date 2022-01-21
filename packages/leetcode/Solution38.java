public class Solution38 {
  public static String countAndSay(int n) {
    if (n < 2) {
      return "1";
    }
    return recursion("1", n - 1);
  }
  public static String recursion(String str, int count) {
    char[] chars = str.toCharArray();
    StringBuilder sbd = new StringBuilder();
    char last = '.';
    int num = 0;
    for (int i = chars.length - 1; i >= 0; i--) {
      if (chars[i] != last) {
        if (num != 0) {
          sbd.insert(0, num);
          num = 0;
        }
        sbd.insert(0, chars[i]);
        last = chars[i];
      }
      num++;
    }
    sbd.insert(0, num);
    if (count > 1) {
      return recursion(sbd.toString(), count - 1);
    } else {
      return sbd.toString();
    }
  }
  public static void main(String[] args) {
    System.out.println(countAndSay(2));
  }
}
