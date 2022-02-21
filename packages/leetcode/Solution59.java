public class Solution59 {
  enum State {
    RIGHT,
    DOWN,
    LEFT,
    UP,
  }

  public int[][] generateMatrix(int n) {
    int[][] matrix = new int[n][n];
    boolean[][] touchedMatrix = new boolean[n][n];
    return recursion(State.RIGHT, matrix, touchedMatrix, 0, 0, 1);
  }

  public int[][] recursion(State state, int[][] matrix, boolean[][] touchedMatrix, int row, int col, int index) {
    matrix[row][col] = index;
    touchedMatrix[row][col] = true;

    if (index == matrix.length * matrix.length) {
      return matrix;
    }

    if (state == State.RIGHT && (col + 1 >= matrix.length || touchedMatrix[row][col + 1])) {
      return recursion(State.DOWN, matrix, touchedMatrix, row + 1, col, index + 1);
    }
    if (state == State.DOWN && (row + 1 >= matrix.length || touchedMatrix[row + 1][col])) {
      return recursion(State.LEFT, matrix, touchedMatrix, row, col - 1, index + 1);
    }
    if (state == State.LEFT && (col - 1 < 0 || touchedMatrix[row][col - 1])) {
      return recursion(State.UP, matrix, touchedMatrix, row - 1, col, index + 1);
    }
    if (state == State.UP && (row - 1 < 0 || touchedMatrix[row - 1][col])) {
      return recursion(State.RIGHT, matrix, touchedMatrix, row, col + 1, index + 1);
    }

    if (state == State.RIGHT) {
      return recursion(state, matrix, touchedMatrix, row, col + 1, index + 1);
    }
    if (state == State.DOWN) {
      return recursion(state, matrix, touchedMatrix, row + 1, col, index + 1);
    }
    if (state == State.LEFT) {
      return recursion(state, matrix, touchedMatrix, row, col - 1, index + 1);
    }
    return recursion(state, matrix, touchedMatrix, row - 1, col, index + 1);
  }

  public static void main(String[] args) {
    Solution59 s = new Solution59();
    int[][] ans = s.generateMatrix(1);
    for (int[] arr : ans) {
      System.out.print('[');
      for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i]);
        if (i != arr.length - 1)
          System.out.print(" ,");
      }
      System.out.println(']');
    }
    System.out.println();
  }
}
