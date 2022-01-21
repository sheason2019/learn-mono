import java.util.ArrayList;
import java.util.HashMap;

public class Solution20 {
  public static boolean isValid(String s) {
    ArrayList<Character> charStack = new ArrayList<Character>();
    HashMap<Character, Character> signMap = new HashMap<Character, Character>();
    signMap.put('(', ')');
    signMap.put('[', ']');
    signMap.put('{', '}');
    char[] charArr = s.toCharArray();
    for (char c : charArr) {
      if (c == '(' || c == '{' || c == '[') {
        charStack.add(c);
      } else if (c == ')' || c == '}' || c == ']') {
        if (charStack.size() == 0) {
          return false;
        } else if (c != signMap.get(charStack.remove(charStack.size() - 1))) {
          return false;
        }
      }
    }
    if (charStack.size() == 0) {
      return true;
    }
    return false;
  }
  public static void main(String[] args) {
    System.out.println(isValid("()"));
  }
}
