import java.util.HashMap;
import java.util.Map;

public class Solution76 {
  public String minWindow(String s, String t) {
    if (t.length() > s.length()) {
      return "";
    }
    Map<Character, int[]> map = new HashMap<>();
    for (int i = 0; i < t.length(); i++) {
      char c = t.charAt(i);
      if (map.containsKey(c)) {
        map.get(c)[1]++;
      } else {
        map.put(c, new int[] { 0, 1 });
      }
    }
    int valid = 0;
    char[] s_chars = s.toCharArray();
    int left = 0;
    int right = 0;
    String ans = "";
    while (right < s_chars.length || (valid >= t.length() && right - left >= t.length())) {
      if (valid < t.length()) {
        if (map.containsKey(s_chars[right])) {
          int[] arr = map.get(s_chars[right]);
          if (arr[0] < arr[1]) {
            valid++;
          }
          arr[0]++;
        }
        right++;
      } else {
        if (ans.length() == 0 || (ans.length() != 0 && right - left < ans.length())) {
          ans = s.substring(left, right);
        }
        if (map.containsKey(s_chars[left])) {
          int[] arr = map.get(s_chars[left]);
          if (arr[0] <= arr[1]) {
            valid--;
          }
          arr[0]--;
        }
        left++;
      }
    }
    return ans;
  }

  public static void main(String[] args) {
    System.out.println(new Solution76().minWindow("abc", "cba"));
  }
}
