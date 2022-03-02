import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution89 {
  public List<Integer> grayCode(int n) {
    List<Integer> ans = new ArrayList<>();
    for (int i = 0; i < 1 << n; i++) {
      ans.add(i ^ i >> 1);
    }
    return ans;
  }

  public static void main(String[] args) {
    List<Integer> ans = new Solution89().grayCode(4);
    System.out.println(Arrays.toString(ans.toArray()));
  }
}
