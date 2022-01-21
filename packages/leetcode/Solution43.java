public class Solution43 {
  // 模拟竖式的逻辑
  public static String multiply(String num1, String num2) {
    if ("0".equals(num1) || "0".equals(num2)) 
      return "0";
    char[] c1 = num1.toCharArray(), c2 = num2.toCharArray();
    // 偏移
    int offset = 0, temp = 0;
    StringBuilder voidBuilder = new StringBuilder();
    StringBuilder staticBuilder = new StringBuilder();
    for (int i = c1.length - 1; i >= 0; i--) {
      char a = c1[i];
      for (int j = c2.length - 1; j >= 0; j--) {
        char b = c2[j];
        int val = (a - '0') * (b - '0');
        int value = (val + temp) % 10;
        temp = (val + temp) / 10;
        voidBuilder.insert(0, value);
      }
      if (temp != 0) {
        voidBuilder.insert(0, String.valueOf(temp));
        temp = 0;
      }
      merge(staticBuilder, voidBuilder, offset++);
      voidBuilder.delete(0, voidBuilder.length());
    }

    return staticBuilder.toString();
  }

  public static void merge(StringBuilder staticBuilder, StringBuilder voidBuilder, int offset) {
    int temp = 0;
    for (int i = 0; i < voidBuilder.length(); i++) {
      int a = voidBuilder.charAt(voidBuilder.length() - 1 - i) - '0';
      int b = 0;
      if (staticBuilder.length() - 1 - (i + offset) >= 0) {
        b = staticBuilder.charAt(staticBuilder.length() - 1 - (i + offset)) - '0';
      }
      int value = a + b % 10 + temp;
      temp = 0;
      if (value >= 10) {
        value = value % 10;
        temp = 1;
      }
      if (i + offset >= staticBuilder.length()) {
        staticBuilder.insert(0, String.valueOf(value));
      } else {
        staticBuilder.replace(
            staticBuilder.length() - (i + offset + 1), 
            staticBuilder.length() - (i + offset),
            String.valueOf(value)
        );
      }
    }
    if (temp != 0) {
      if (voidBuilder.length() + offset >= staticBuilder.length()) {
        staticBuilder.insert(0, '1');
        temp = 0;
      } else {
        int a = voidBuilder.charAt(0) - '0';
        int val = a + 1;
        temp = 0;
        if (val > 9) {
          temp = 1;
          val /= 10;
        }
        staticBuilder.replace(0, 1, String.valueOf(val));
      }
    }
  }

  public static void main(String[] args) {
    String result = multiply("123456789", "987654321");
    System.out.println(result);
  }
}
