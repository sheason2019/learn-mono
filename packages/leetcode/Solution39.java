import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Solution39 {
  public static List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    List<int[]> arrList = recursion(candidates, target, new ArrayList<>());
    for (int[] arr : arrList) {
      List<Integer> list = Arrays.stream(arr).sorted().boxed().collect(Collectors.toList());
      if (result.size() == 0) {
        result.add(list);
      } else {
        boolean shouldAdd = true;
        for (int index = 0; index < result.size(); index++) {
          List<Integer> existList = result.get(index);
          if (existList.size() == list.size()) {
            for (int i = 0; i < list.size(); i++) {
              if (existList.get(i) != list.get(i)) {
                break;
              } else if (i == list.size() - 1) {
                shouldAdd = false;
              }
            }
          }
        }
        if (shouldAdd) {
          result.add(list);
        }
      }
    }
    return result;
  }

  public static List<int[]> recursion(int[] candidates, int target, List<int[]> list) {
    List<int[]> nextList = new ArrayList<>();
    if (list.size() == 0) {
      for (int i : candidates) {
        if (i <= target) {
          nextList.add(new int[] { i });
        }
      }
      if (nextList.size() == 0) {
        return nextList;
      } else {
        return recursion(candidates, target, nextList);
      }
    }
    boolean hasChanged = false;
    for (int[] arr : list) {
      int count = 0;
      for (int i = 0; i < arr.length; i++) {
        count += arr[i];
      }
      if (count >= target) {
        // 如果数组内的值与target大于或等于，不再对数组进行操作
        nextList.add(arr);
        continue;
      }
      for (int i : candidates) {
        if (count + i <= target) {
          int[] newArr = new int[arr.length + 1];
          for (int j = 0; j < arr.length; j++) {
            newArr[j] = arr[j];
          }
          newArr[newArr.length - 1] = i;
          nextList.add(newArr);

          hasChanged = true;
        }
      }
    }
    if (hasChanged) {
      return recursion(candidates, target, nextList);
    } else {
      return nextList;
    }
  }

  public static void main(String[] args) {
    List<List<Integer>> list = combinationSum(new int[] { 2 }, 1);
    System.out.println(list);
  }
}
