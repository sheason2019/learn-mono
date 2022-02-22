public class Solution65 {
  public boolean isNumber(String s) {
    char[] chars = s.toCharArray();
    int index = 0;
    int state = 0;
    boolean hasDot = false;
    boolean hasNumberBeforeDot = false;
    boolean hasNumberAfterDot = false;
    while (index < chars.length) {
      if (state == 0) {
        if (chars[index] == '+' || chars[index] == '-') {
          state = 1;
        } else if (chars[index] >= '0' && chars[index] <= '9') {
          hasNumberBeforeDot = true;
          state = 1;
        } else if (chars[index] == '.') {
          hasDot = true;
          state = 2;
          index++;
          continue;
        } else {
          return false;
        }
        index++;
        continue;
      }
      if (state == 1) {
        if (chars[index] >= '0' && chars[index] <= '9') {
          hasNumberBeforeDot = true;
          index++;
          continue;
        } else if (chars[index] == '.') {
          hasDot = true;
          state = 2;
          index++;
          continue;
        } else if (chars[index] == 'e' || chars[index] == 'E') {
          if (hasNumberBeforeDot) {
            state = 3;
            index++;
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      if (state == 2) {
        if (chars[index] >= '0' && chars[index] <= '9') {
          hasNumberAfterDot = true;
          index++;
          continue;
        } else if (chars[index] == 'e' || chars[index] == 'E') {
          if ((hasDot && (hasNumberBeforeDot || hasNumberAfterDot)) || !hasDot) {
            state = 3;
            index++;
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      if (state == 3) {
        if (chars[index] == '+' || chars[index] == '-') {
          state = 4;
        } else if (chars[index] >= '0' && chars[index] <= '9') {
          state = 5;
        } else {
          return false;
        }
        index++;
        continue;
      }
      if (state == 4) {
        if (chars[index] >= '0' && chars[index] <= '9') {
          state = 5;
          index++;
          continue;
        } else {
          return false;
        }
      }
      if (state == 5) {
        if (chars[index] >= '0' && chars[index] <= '9') {
          index++;
          continue;
        } else {
          return false;
        }
      }
    }
    if (hasDot && !hasNumberAfterDot && !hasNumberBeforeDot) {
      return false;
    }
    if (state == 1 || state == 2 || state == 5) {
      return true;
    }
    return false;
  }

  public static void main(String[] args) {
    String[] trueList = { "2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93",
        "-123.456e789", ".1", "-1." };
    String[] falseList = { "abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53", "." };
    Solution65 s = new Solution65();
    s.isNumber("-123.456e789");
    for (String str : trueList) {
      if (!s.isNumber(str)) {
        System.out.println(str);
      }
    }
    for (String str : falseList) {
      if (s.isNumber(str)) {
        System.out.println(str);
      }
    }
  }
}
