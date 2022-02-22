public class Solution67 {
  char getChar(char[] chars, int index) {
    if (index >= chars.length || index < 0) {
      return '0';
    } else {
      return chars[index];
    }
  }

  public String addBinary(String a, String b) {
    StringBuilder ans = new StringBuilder();
    int carryNum = 0;
    int point = 0;
    int max = Math.max(a.length(), b.length());
    char[] a_chars = a.toCharArray();
    char[] b_chars = b.toCharArray();
    while (point < max) {
      int sum = getChar(a_chars, a.length() - point - 1) - '0' + getChar(b_chars, b.length() - point - 1) - '0'
          + carryNum;
      carryNum = sum / 2;
      ans.insert(0, sum % 2);
      point++;
    }
    if (carryNum != 0) {
      ans.insert(0, carryNum);
    }
    return ans.toString();
  }

  public static void main(String[] args) {
    System.out.println(new Solution67().addBinary("1010", "10111"));
  }
}
