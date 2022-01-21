import java.util.HashSet;
import java.util.Set;

public class Solution36 {
  public static boolean isValidSudoku(char[][] board) {
    // 行
    for (int row = 0; row < 9; row++) {
      Set<Character> rowSet  = new HashSet<Character>();
      for (int col = 0; col < 9; col++) {
        if (board[row][col] != '.') {
          if (rowSet.contains(board[row][col])) {
            return false;
          } else {
            rowSet.add(board[row][col]);
          }
        }
      }
    }
    // 列
    for (int col = 0; col < 9; col++) {
      Set<Character> colSet = new HashSet<Character>();
      for (int row = 0; row < 9; row++) {
        if (board[row][col] != '.') {
          if (colSet.contains(board[row][col])) {
            return false;
          } else {
            colSet.add(board[row][col]);
          }
        }
      }
    }
    // 块
    for (int block = 0; block < 9; block++) {
      int blockRow = block / 3, blockCol = block % 3;
      Set<Character> blockSet = new HashSet<Character>();
      for (int item = 0; item < 9; item++) {
        int itemRow = blockRow * 3 + item / 3, itemCol = blockCol * 3 + item % 3;
        if (board[itemRow][itemCol] != '.') {
          if (blockSet.contains(board[itemRow][itemCol])) {
            return false;
          } else {
            blockSet.add(board[itemRow][itemCol]);
          }
        }
      }
    }
    return true;
  }
  public static void main(String[] args) {
    char[][] test = new char[][] {
        new char[] { '5', '3', '.', '.', '7', '.', '.', '.', '.' },
        new char[] { '6', '.', '.', '1', '9', '5', '.', '.', '.' },
        new char[] { '.', '9', '8', '.', '.', '.', '.', '6', '.' },
        new char[] { '8', '.', '.', '.', '6', '.', '.', '.', '3' },
        new char[] { '4', '.', '.', '8', '.', '3', '.', '.', '1' },
        new char[] { '7', '.', '.', '.', '2', '.', '.', '.', '6' },
        new char[] { '.', '6', '.', '.', '.', '.', '2', '8', '.' },
        new char[] { '.', '.', '.', '4', '1', '9', '.', '.', '5' },
        new char[] { '.', '.', '.', '.', '8', '.', '.', '7', '9' } };
    System.out.println(isValidSudoku(test));
  }
}
