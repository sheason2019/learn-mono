import java.util.Arrays;

public class Solution37 {
  public static void solveSudoku(char[][] board) {
    sudokuController(board);
  }

  public static boolean sudokuController(char[][] board) {
    Character[] values = new Character[] { '1', '2', '3', '4', '5', '6', '7', '8', '9' };
    int[] rc = new int[] { -1, -1 };
    boolean hasFindFirstNode = false;
    // 以三维形式来思考数独的每个空格可能的值
    int[][] possibleValue = new int[9][9];
    for (int i = 0; i < 9; i++) {
      for (int j = 0; j < 9; j++) {
        possibleValue[i][j] = 0x1FF;
      }
    }
    // 减去不可能的值 - 行
    for (int row = 0; row < 9; row++) {
      int rowNum = 0;
      for (int col = 0; col < 9; col++) {
        if (board[row][col] != '.') {
          rowNum = rowNum | (int) (Math.pow(2, (board[row][col] - '0' - 1)));
        }
      }
      for (int col = 0; col < 9; col++) {
        if (board[row][col] == '.') {
          possibleValue[row][col] = possibleValue[row][col] & ~rowNum;
        }
      }
    }
    // 减去不可能的值 - 列
    for (int col = 0; col < 9; col++) {
      int colNum = 0;
      for (int row = 0; row < 9; row++) {
        if (board[row][col] != '.') {
          colNum = colNum | (int) (Math.pow(2, (board[row][col] - '0' - 1)));
        }
      }
      for (int row = 0; row < 9; row++) {
        if (board[row][col] == '.') {
          possibleValue[row][col] = possibleValue[row][col] & ~colNum;
        }
      }
    }
    // 减去不可能的值 - 块
    for (int block = 0; block < 9; block++) {
      int blockRow = block / 3, blockCol = block % 3;
      int blockNum = 0;
      for (int item = 0; item < 9; item++) {
        int itemRow = blockRow * 3 + item / 3, itemCol = blockCol * 3 + item % 3;
        if (board[itemRow][itemCol] != '.') {
          blockNum = blockNum | (int) (Math.pow(2, (board[itemRow][itemCol] - '0' - 1)));
        }
      }
      for (int item = 0; item < 9; item++) {
        int itemRow = blockRow * 3 + item / 3, itemCol = blockCol * 3 + item % 3;
        if (board[itemRow][itemCol] == '.') {
          possibleValue[itemRow][itemCol] = possibleValue[itemRow][itemCol] & ~blockNum;
        }
      }
    }

    boolean hasChanged = false;
    // 遍历数组board，寻找可以填入的数据
    for (int row = 0; row < 9; row++) {
      for (int col = 0; col < 9; col++) {
        if (board[row][col] == '.') {
          if (!hasFindFirstNode) {
            rc[0] = row;
            rc[1] = col;
            hasFindFirstNode = true;
          }
          int count = 0; // 可选值数量
          int time = 0; // 循环次数
          Character value = '.'; // 可选值
          int temp = possibleValue[row][col];
          while (temp != 0) {
            time++;
            if ((temp & 1) != 0) {
              ++count;
              value = (char) ('0' + time);
            }
            temp = temp >> 1;
            if (count > 2)
              break;
          }
          // 填入数据
          if (count == 1) {
            board[row][col] = value;

            // 填入数据后为相关行列块去重
            for (int i = 0; i < 9; i++) {
              // 行
              possibleValue[row][i] = possibleValue[row][i] & ~(int) Math.pow(2, (value - '0') - 1);
              // 列
              possibleValue[i][col] = possibleValue[i][col] & ~(int) Math.pow(2, (value - '0') - 1);
              // 块
              int itemRow = row / 3 * 3 + i / 3, itemCol = col / 3 * 3 + i % 3;
              possibleValue[itemRow][itemCol] = possibleValue[itemRow][itemCol] & ~(int) Math.pow(2, (value - '0') - 1);
            }

            hasChanged = true;
          } else if (count == 0) {
            // 为0返回错误，回到上一次备份的地点
            if (hasFindFirstNode) {
              return false;
            }
          }
        }
      }
    }
    if (!hasChanged) {
      // 如果没有找到空位，返回true
      if (rc[0] == -1)
        return true;
      char[][] bak = new char[9][9];
      char[][] use = new char[9][9];
      for (int row = 0; row < 9; row++) {
        bak[row] = Arrays.copyOf(board[row], 9);
      }
      for (int i = 0; i < 9; i++) {
        if (possibleValue[rc[0]][rc[1]] != 0 && ((possibleValue[rc[0]][rc[1]] >> i) & 1) != 0) {
          for (int row = 0; row < 9; row++) {
            use[row] = Arrays.copyOf(board[row], 9);
          }
          use[rc[0]][rc[1]] = values[i];
          if (sudokuController(use)) {
            for (int row = 0; row < board.length; row++) {
              board[row] = use[row];
            }
            return sudokuController(board);
          } else {
            continue;
          }
        }
      }
      return false;
    } else {
      return sudokuController(board);
    }
  }

  public static void main(String[] args) {
    char[][] test = new char[][] {
        new char[] { '.', '.', '9', '7', '4', '8', '.', '.', '.' },
        new char[] { '7', '.', '.', '.', '.', '.', '.', '.', '.' },
        new char[] { '.', '2', '.', '1', '.', '9', '.', '.', '.' },
        new char[] { '.', '.', '7', '.', '.', '.', '2', '4', '.' },
        new char[] { '.', '6', '4', '.', '1', '.', '5', '9', '.' },
        new char[] { '.', '9', '8', '.', '.', '.', '3', '.', '.' },
        new char[] { '.', '.', '.', '8', '.', '3', '.', '2', '.' },
        new char[] { '.', '.', '.', '.', '.', '.', '.', '.', '6' },
        new char[] { '.', '.', '.', '2', '7', '5', '9', '.', '.' } };
    solveSudoku(test);
    for (char[] row : test) {
      for (char c : row) {
        System.out.print(c + ", ");
      }
      System.out.println();
    }
  }
}
