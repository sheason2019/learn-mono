import java.util.ArrayList;
import java.util.List;

public class Solution60 {
  public int factorial(int n) {
    if (n <= 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  public String getPermutation(int n, int k) {
    List<Integer> list = new ArrayList<>();
    for (int i = 0; i < n; i++) {
      list.add(i + 1);
    }
    k--;
    StringBuilder builder = new StringBuilder();
    for (int i = n - 1; i > 0; i--) {
      int val = factorial(i);
      builder.append(list.remove((int) Math.ceil(k / val)));
      k = k % val;
    }
    builder.append(list.get(0));
    return builder.toString();
  }

  public static void main(String[] args) {
    Solution60 s = new Solution60();
    System.out.println(s.getPermutation(3, 1));
  }
}