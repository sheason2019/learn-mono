public class Solution97 {
  public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) {
      return false;
    }
    if (s1.length() == 0) {
      if (s2.equals(s3)) {
        return true;
      }
      return false;
    }
    if (s2.length() == 0) {
      if (s1.equals(s3)) {
        return true;
      }
      return false;
    }

    boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];
    for (int i = 0; i < s1.length() + 1; i++) {
      for (int j = 0; j < s2.length() + 1; j++) {
        if (i == 0 && j == 0) {
          dp[i][j] = true;
        }
        if (j != 0) {
          if (dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1)) {
            dp[i][j] = true;
          }
        }
        if (i != 0) {
          if (dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) {
            dp[i][j] = true;
          }
        }
      }
    }
    return dp[s1.length()][s2.length()];
  }

  public static void main(String[] args) {
    System.out.println(new Solution97().isInterleave("aabaac", "aadaaeaaf", "aadaaeaabaafaac"));
  }
}
