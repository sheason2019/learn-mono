import java.util.BitSet;

public class Solution57 {
  public int[][] insert(int[][] intervals, int[] newInterval) {
    BitSet bitSet = new BitSet();
    int max = 0;
    for (int[] arr : intervals) {
      int temp = arr[1] * 2 + 1;
      bitSet.set(arr[0] * 2, temp, true);
      if (max < temp) {
        max = temp;
      }
    }
    {
      int temp = newInterval[1] * 2 + 1;
      bitSet.set(newInterval[0] * 2, temp, true);
      if (max < temp) {
        max = temp;
      }
    }
    int[][] array = new int[intervals.length + 1][2];
    int index = 0, count = 0;
    while (index < max) {
      int start = bitSet.nextSetBit(index);
      int end = bitSet.nextClearBit(start);

      int[] item = { start / 2, (end - 1) / 2 };
      array[count++] = item;

      index = end;
    }
    int[][] ans = new int[count][2];
    for (int i = 0; i < count; i++) {
      ans[i] = array[i];
    }

    return ans;
  }

  public static void main(String[] args) {
    Solution57 s = new Solution57();
    int[][] ans = s
        .insert(new int[][] { new int[] { 1, 2 }, new int[] { 3, 5 }, new int[] { 6, 7 }, new int[] { 8, 10 },
            new int[] { 12, 16 }
        }, new int[] { 4, 8 });
    for (int[] arr : ans) {
      System.out.printf("[%d, %d] ", arr[0], arr[1]);
    }
    System.out.println();
  }
}
