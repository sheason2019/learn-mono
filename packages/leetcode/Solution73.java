import java.util.Arrays;

public class Solution73 {
  public void setZeroes(int[][] matrix) {
    boolean row0 = false, col0 = false;
    for (int i = 0; i < matrix.length; i++) {
      for (int j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] == 0) {
          matrix[0][j] = 0;
          matrix[i][0] = 0;
          if (i == 0) {
            row0 = true;
          }
          if (j == 0) {
            col0 = true;
          }
        }
      }
    }
    for (int i = 1; i < matrix.length; i++) {
      if (matrix[i][0] == 0) {
        for (int j = 1; j < matrix[0].length; j++) {
          matrix[i][j] = 0;
        }
      }
    }
    for (int j = 1; j < matrix[0].length; j++) {
      if (matrix[0][j] == 0) {
        for (int i = 1; i < matrix.length; i++) {
          matrix[i][j] = 0;
        }
      }
    }
    if (row0) {
      for (int i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = 0;
      }
    }
    if (col0) {
      for (int i = 0; i < matrix.length; i++) {
        matrix[i][0] = 0;
      }
    }
  }

  public static void main(String[] args) {
    int[][] matrix = { { 1, 1, 1 }, { 1, 0, 1 }, { 1, 1, 1 } };
    new Solution73().setZeroes(matrix);
    for (int[] arr : matrix) {
      System.out.println(Arrays.toString(arr));
    }

  }
}
