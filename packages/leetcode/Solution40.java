import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class Solution40 {
  public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
    List<int[]> list = new ArrayList<>();
    HashSet<String> existSet = new HashSet<String>();

    recursion(candidates, new int[0], target, list);

    List<List<Integer>> result = new ArrayList<>();
    for (int[] arr : list) {
      StringBuilder sb = new StringBuilder();
      Arrays.sort(arr);
      for (int val : arr) {
        sb.append(val);
      }
      if (!existSet.contains(sb.toString())) {
        result.add(Arrays.stream(arr).boxed().collect(Collectors.toList()));
        existSet.add(sb.toString());
      }
    }

    return result;
  }

  public static int[] getListWithoutItem(int[] list, int index) {
    int[] newList = new int[list.length - 1];
    for (int i = 0, j = 0; i < list.length; i++) {
      if (i != index) {
        newList[j++] = list[i];
      }
    }
    return newList;
  }

  public static int[] getNewStash(int[] stash, int value) {
    int[] newStash = new int[stash.length + 1];
    for (int i = 0; i < stash.length; i++) {
      newStash[i] = stash[i];
    }
    newStash[newStash.length - 1] = value;
    return newStash;
  }

  public static int stashSum(int[] stash) {
    int sum = 0;
    for (int val : stash) {
      sum += val;
    }
    return sum;
  }

  public static void recursion(int[] candidatesList, int[] stash, int target, List<int[]> list) {
    HashSet<Integer> usedSet = new HashSet<>();
    for (int i = 0; i < candidatesList.length; i++) {
      if (usedSet.contains(candidatesList[i])) continue;
      // 暂存空间为0，即算法初始化
      int[] newCandidatesList = getListWithoutItem(candidatesList, i);
      int sum = candidatesList[i] + stashSum(stash);
      if (sum < target) {
        recursion(newCandidatesList, getNewStash(stash, candidatesList[i]), target, list);
      } else if (sum == target) {
        list.add(getNewStash(stash, candidatesList[i])); 
      }
      usedSet.add(candidatesList[i]);
    }
  }

  public static void main(String[] args) {
    System.out.println(combinationSum2(new int[] { 10, 1, 2, 7, 6, 1, 5 }, 8));
  }
}
