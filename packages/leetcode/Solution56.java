import java.util.BitSet;

public class Solution56 {
  public int[][] merge(int[][] intervals) {
    BitSet bitSet = new BitSet();
    int max = 0;
    for (int[] arr : intervals) {
      bitSet.set(arr[0] * 2, arr[1] * 2 + 1, true);
      if (arr[1] * 2 + 1 > max) {
        max = arr[1] * 2 + 1;
      }
    }
    int index = 0, count = 0;
    while (index < max) {
      int start = bitSet.nextSetBit(index);
      int end = bitSet.nextClearBit(start);
      int[] item = { start / 2, (end - 1) / 2 };
      intervals[count++] = item;
      index = end;
    }
    int[][] ans = new int[count][2];
    for (int i = 0; i < count; i++) {
      ans[i] = intervals[i];
    }
    return ans;
  }

  public static void main(String[] args) {
    Solution56 s = new Solution56();
    int[][] ans = s
        .merge(new int[][] { new int[] { 2, 3 }, new int[] { 5, 5 }, new int[] { 2, 2 }, new int[] { 3, 4 },
            new int[] { 3, 4 },
        });
    for (int[] arr : ans) {
      System.out.printf("[%d, %d] ", arr[0], arr[1]);
    }
    System.out.println();
  }
}
