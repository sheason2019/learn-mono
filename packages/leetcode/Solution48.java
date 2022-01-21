import java.util.ArrayList;
import java.util.List;

public class Solution48 {
  public void rotate(int[][] matrix) {
    int edge = matrix.length;
    for (int offset = 0; offset < edge / 2; offset++) {
      List<int[]> rotateStep = getRotateStep(edge, offset);
      for (int loop = 0; loop < edge - 2 * offset - 1; loop++) {
        for (int i = 1; i < rotateStep.size(); i++) {
          int[] temp1 = rotateStep.get(i);
          int[] temp2 = rotateStep.get(i - 1);
          int temp;
          temp = matrix[temp1[0]][temp1[1]];
          matrix[temp1[0]][temp1[1]] = matrix[temp2[0]][temp2[1]];
          matrix[temp2[0]][temp2[1]] = temp;
        }
      }
    }
  }

  public List<int[]> getRotateStep(int _edge, int offset) {
    int edge = _edge - 2 * offset;
    List<int[]> rotateStep = new ArrayList<>();
    int x = offset, y = offset;
    boolean shouldDecreaseX = false, shouldDecreaseY = false;
    for (int i = 0; i < 4 * edge - 4; i++) {
      rotateStep.add(new int[] { x, y });
      if (!shouldDecreaseX && !shouldDecreaseY) {
        x++;
        if (x == edge + offset - 1) {
          shouldDecreaseX = true;
        }
      } else if (shouldDecreaseX && !shouldDecreaseY) {
        y++;
        if (y == edge + offset - 1) {
          shouldDecreaseY = true;
        }
      } else if (shouldDecreaseX && shouldDecreaseY) {
        x--;
        if (x == 0 + offset) {
          shouldDecreaseX = false;
        }
      } else if (!shouldDecreaseX && shouldDecreaseY) {
        y--;
        if (y == 0 + offset) {
          shouldDecreaseY = false;
        }
      }
    }
    return rotateStep;
  }

  public static void main(String[] args) {
    Solution48 s = new Solution48();
    int[][] matrix = new int[][] {
        new int[] { 1, 2, 3, 4, 5 },
        new int[] { 6, 7, 8, 9, 10 },
        new int[] { 11, 12, 13, 14, 15 },
        new int[] { 16, 17, 18, 19, 20 },
        new int[] { 21, 22, 23, 24, 25 },
    };
    s.rotate(matrix);
    for (int[] arr : matrix) {
      System.out.print("[");
      for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i]);
        if (i != arr.length - 1) {
          System.out.print(", ");
        }
      }
      System.out.println("]");
    }
  }
}
