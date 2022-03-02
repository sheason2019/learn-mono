import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution93 {
  public List<String> restoreIpAddresses(String s) {
    List<String> ans = new ArrayList<>();
    if (s.length() > 12 || s.length() < 4) {
      return ans;
    } else {
      recursion(s, new ArrayList<>(), ans);
    }
    return ans;
  }

  public void recursion(String s, List<Integer> list, List<String> ans) {
    for (int i = 0, number = 0; i < s.length() && i < 3; i++) {
      List<Integer> nextList = new ArrayList<>(list);
      number = number * 10 + s.charAt(i) - '0';
      if (number > 255) {
        break;
      }
      nextList.add(number);
      if (nextList.size() == 4 && i == s.length() - 1) {
        StringBuilder builder = new StringBuilder();
        for (int j = 0; j < nextList.size(); j++) {
          builder.append(nextList.get(j));
          if (j != 3) {
            builder.append('.');
          }
        }
        ans.add(builder.toString());
      } else if (number <= 255) {
        recursion(s.substring(i + 1, s.length()), nextList, ans);
      }
      if (number == 0) {
        break;
      }
    }
  }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(new Solution93().restoreIpAddresses("172162541").toArray()));
  }
}
