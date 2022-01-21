public class Solution44 {
  public static boolean isMatch(String s, String p) {
    s = " " + s;
    p = " " + p;
    boolean[][] matchMatrix = new boolean[s.length()][p.length()];
    matchMatrix[0][0] = true;
    for (int i = 0; i < s.length(); i++) {
      for (int j = 1; j < p.length(); j++) {
        if (p.charAt(j) == '*') {
          if (matchMatrix[i][j - 1] || (i > 0 && matchMatrix[i - 1][j])) {
            matchMatrix[i][j] = true;
          }
        } else if (p.charAt(j) == s.charAt(i) || p.charAt(j) == '?') {
          if (i > 0 && matchMatrix[i - 1][j - 1]) {
            matchMatrix[i][j] = true;
          }
        }
      }
    }
    return matchMatrix[s.length() - 1][p.length() - 1];
  }

  public static void main(String[] args) {
    System.out.println(isMatch(
        "adceb",
        "*a*b"));
  }
}
