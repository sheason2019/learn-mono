import java.util.ArrayList;
import java.util.List;

public class Solution54 {
  public enum State {
    RIGHT, DOWN, LEFT, UP,
  }

  // 获取移动的状态
  public State getNextState(State state) {
    if (state == State.RIGHT) {
      return State.DOWN;
    }
    if (state == State.DOWN) {
      return State.LEFT;
    }
    if (state == State.LEFT) {
      return State.UP;
    }
    return State.RIGHT;
  }

  public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> ans = new ArrayList<>();
    // 初始化布尔类矩阵，用来判断数据是否已被读取
    int rowNum = matrix.length;
    int colNum = matrix[0].length;
    boolean[][] touchedMatrix = new boolean[rowNum][colNum];
    for (int i = 0; i < rowNum; i++) {
      touchedMatrix[i] = new boolean[colNum];
    }
    State state = State.RIGHT;

    recursion(state, matrix, touchedMatrix, 0, 0, ans, rowNum * colNum);

    return ans;
  }

  public void recursion(State state, int[][] matrix, boolean[][] touchedMatrix, int row, int col, List<Integer> ans,
      int targetSize) {
    State nextState = state;
    int nextRow = row, nextCol = col;
    ans.add(matrix[row][col]);
    // 已经到达目标大小就返回
    if (ans.size() >= targetSize)
      return;
    // 否则去寻找下一个遍历的节点
    touchedMatrix[row][col] = true;

    if (state == State.RIGHT && (col + 1 >= matrix[0].length || touchedMatrix[row][col + 1])) {
      nextState = getNextState(state);
    }
    if (state == State.DOWN && (row + 1 >= matrix.length || touchedMatrix[row + 1][col])) {
      nextState = getNextState(state);
    }
    if (state == State.LEFT && (col - 1 < 0 || touchedMatrix[row][col - 1])) {
      nextState = getNextState(state);
    }
    if (state == State.UP && (row - 1 < 0 || touchedMatrix[row - 1][col])) {
      nextState = getNextState(state);
    }
    if (nextState == State.RIGHT) {
      nextCol++;
    } else if (nextState == State.DOWN) {
      nextRow++;
    } else if (nextState == State.LEFT) {
      nextCol--;
    } else if (nextState == State.UP) {
      nextRow--;
    }
    recursion(nextState, matrix, touchedMatrix, nextRow, nextCol, ans, targetSize);
  }

  public static void main(String[] args) {
    Solution54 s = new Solution54();
    int[][] matrix = new int[][] { new int[] { 1, 2, 3, 4 }, new int[] { 5, 6, 7, 8 }, new int[] { 9, 10, 11, 12 }, };
    System.out.println(s.spiralOrder(matrix));
  }
}