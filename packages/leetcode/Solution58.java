public class Solution58 {
  public int lengthOfLastWord(String s) {
    char[] chars = s.toCharArray();
    int count = 0;
    boolean start = false;
    for (int i = chars.length - 1; i > -1; i--) {
      if (chars[i] != ' ') {
        start = true;
      }
      if (start) {
        if (chars[i] != ' ') {
          count++;
        } else {
          return count;
        }
      }
    }
    return count;
  }
  public static void main(String[] args) {
    Solution58 s = new Solution58();
    System.out.println(s.lengthOfLastWord("luffy is still joyboy"));
  }
}
