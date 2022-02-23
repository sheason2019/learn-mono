import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution77 {
  public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> ans = new ArrayList<>();
    int index = 0;
    while (index < k) {
      List<List<Integer>> nextAns = new ArrayList<>();
      if (index == 0) {
        for (int i = 0; i < n - k + 1; i++) {
          List<Integer> list = new ArrayList<>();
          list.add(i + 1);
          nextAns.add(list);
        }
      } else {
        for (List<Integer> list : ans) {
          for (int i = list.size(); i < n; i++) {
            if (i >= list.get(list.size() - 1)) {
              List<Integer> newList = new ArrayList<>(list);
              newList.add(i + 1);
              nextAns.add(newList);
            }
          }
        }
      }
      ans = nextAns;
      index++;
    }
    return ans;
  }

  public static void main(String[] args) {
    List<List<Integer>> ans = new Solution77().combine(1, 1);
    System.out.println('[');
    for (List<Integer> list : ans) {
      System.out.println(Arrays.toString(list.toArray()));
    }
    System.out.println(']');
  }
}
