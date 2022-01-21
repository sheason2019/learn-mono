import java.util.ArrayList;
import java.util.List;

public class Solution22 {
  public static List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    List<StringBuilder> builderList = new ArrayList<>();
    StringBuilder init = new StringBuilder("(");
    builderList.add(init);
    for (int i = 1; i < 2 * n; i++) {
      for(int j = 0; j < builderList.size(); j++) {
        StringBuilder sb = builderList.get(j);
        char[] charArr = sb.toString().toCharArray();
        if (charArr.length == 2 * n) continue;
        int number1 = 0, number0 = 0;
        for (char c : charArr) {
          if (c == ')') {
            number0++;
          } else if (c == '(') {
            number1++;
          }
        }
        if (number1 > number0 && number1 < n) {
          StringBuilder anotherSb = new StringBuilder(sb.toString());
          sb.append("(");
          anotherSb.append(")");
          builderList.add(anotherSb);
        } else if (number0 == number1) {
          sb.append("(");
        } else if (number1 == n) {
          sb.append(")");
        }
      }
    }
    for (StringBuilder sb : builderList) {
      result.add(sb.toString());
    }
    return result;
  }
  public static void main(String[] args) {
    generateParenthesis(4);
  }
}
