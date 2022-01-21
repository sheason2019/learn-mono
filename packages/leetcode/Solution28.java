public class Solution28 {
  public static int strStr(String haystack, String needle) {
    if (needle.length() == 0) return 0;

    char[] hay = haystack.toCharArray(), nee = needle.toCharArray();
    for (int i = 0; i < hay.length - nee.length + 1; i++) {
      if (hay[i] == nee[0]) {
        boolean shouldReturn = true;
        for( int j = 1; j < nee.length; j++) {
          if (nee[j] != hay[i + j]) {
            shouldReturn = false;
            break;
          }
        }
        if (shouldReturn) return i;
      }
    }
    return -1;
  }
  public static void main(String[] args) {
    int test = strStr("mississippi", "issip");
    System.out.println(test);
  }
}
