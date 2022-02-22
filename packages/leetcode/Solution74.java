public class Solution74 {
  public boolean searchMatrix(int[][] matrix, int target) {
    if (target < matrix[0][0] || target > matrix[matrix.length - 1][matrix[0].length - 1]) {
      return false;
    } else if (target == matrix[0][0] || target == matrix[matrix.length - 1][matrix[0].length - 1]) {
      return true;
    }
    int row = -1;
    for (int i = 0; i < matrix.length; i++) {
      if (target > matrix[i][0]) {
        row = i;
      } else if (target == matrix[i][0]) {
        return true;
      } else if (target < matrix[i][0]) {
        break;
      }
    }
    if (row == -1) {
      return false;
    } else {
      for (int j = 0; j < matrix[0].length; j++) {
        if (target == matrix[row][j]) {
          return true;
        }
      }
      return false;
    }
  }

  public static void main(String[] args) {
    int[][] matrix = { { 1, 3, 5 } };
    boolean ans = new Solution74().searchMatrix(matrix, 3);
    System.out.println(ans);
  }
}
