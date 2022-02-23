public class Solution79 {
  public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[0].length; j++) {
        if (recursion(board, word, null, i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  public boolean recursion(char[][] board, String word, boolean[][] touchedBoard, int row, int col) {
    if (board[row][col] == word.charAt(0)) {
      if (word.length() == 1) {
        return true;
      }
      boolean[][] nextTouchedBoard = new boolean[board.length][board[0].length];

      nextTouchedBoard[row][col] = true;
      if (touchedBoard != null) {
        for (int i = 0; i < touchedBoard.length; i++) {
          for (int j = 0; j < touchedBoard[0].length; j++) {
            if (touchedBoard[i][j]) {
              nextTouchedBoard[i][j] = true;
            }
          }
        }
      }
      String nextWord = word.substring(1, word.length());
      if (row + 1 < board.length && !nextTouchedBoard[row + 1][col]) {
        if (recursion(board, nextWord, nextTouchedBoard, row + 1, col)) {
          return true;
        }
      }
      if (row - 1 > -1 && !nextTouchedBoard[row - 1][col]) {
        if (recursion(board, nextWord, nextTouchedBoard, row - 1, col)) {
          return true;
        }
      }
      if (col + 1 < board[0].length && !nextTouchedBoard[row][col + 1]) {
        if (recursion(board, nextWord, nextTouchedBoard, row, col + 1)) {
          return true;
        }
      }
      if (col - 1 > -1 && !nextTouchedBoard[row][col - 1]) {
        if (recursion(board, nextWord, nextTouchedBoard, row, col - 1)) {
          return true;
        }
      }
    }
    return false;
  }

  public static void main(String[] args) {
    char[][] board = { { 'A', 'B', 'C', 'E' }, { 'S', 'F', 'C', 'S' }, { 'A', 'D', 'E', 'E' } };
    System.out.println(new Solution79().exist(board, "ABCCED"));
  }
}
