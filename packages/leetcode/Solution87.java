import java.util.HashMap;
import java.util.Map;

public class Solution87 {
  int dp[][][];
  String s1, s2;

  public boolean isScramble(String s1, String s2) {
    this.dp = new int[s1.length()][s2.length()][s1.length() + 1];
    this.s1 = s1;
    this.s2 = s2;
    return dts(0, 0, s1.length());
  }

  public boolean dts(int i1, int i2, int length) {
    if (dp[i1][i2][length] != 0) {
      return dp[i1][i2][length] == 1;
    }

    if (s1.substring(i1, i1 + length).equals(s2.substring(i2, i2 + length))) {
      dp[i1][i2][length] = 1;
      return true;
    }

    if (!checkIfSimiliar(i1, i2, length)) {
      dp[i1][i2][length] = -1;
      return false;
    }

    for (int i = 1; i < length; i++) {
      if (dts(i1, i2, i) && dts(i1 + i, i2 + i, length - i)) {
        dp[i1][i2][length] = 1;
        return true;
      }
      if (dts(i1, i2 + length - i, i) && dts(i1 + i, i2, length - i)) {
        dp[i1][i2][length] = 1;
        return true;
      }
    }

    dp[i1][i2][length] = -1;
    return false;
  }

  public boolean checkIfSimiliar(int i1, int i2, int length) {
    Map<Character, Integer> map = new HashMap<>();
    for (char c : s1.substring(i1, i1 + length).toCharArray()) {
      map.put(c, map.get(c) == null ? 1 : map.get(c) + 1);
    }
    for (char c : s2.substring(i2, i2+length).toCharArray()) {
      if (map.containsKey(c)) {
        map.put(c, map.get(c) - 1);
      } else {
        return false;
      }
    }
    for (Integer num : map.values()) {
      if (num < 0) {
        return false;
      }
    }
    return true;
  }

  public static void main(String[] args) {
    System.out.println(new Solution87().isScramble("abcde", "caebd"));
  }
}
