import java.util.ArrayList;
import java.util.List;

public class Solution51 {
  public List<List<String>> solveNQueens(int n) {
    List<List<String>> ans = new ArrayList<>();
    markMatrix(new byte[n][n], 0, ans);
    return ans;
  }

  public void markMatrix(byte[][] matrix, int index, List<List<String>> ans) {
    int len = matrix.length;

    for (int i = 0; i < len; i++) {
      byte[][] nextMatrix = new byte[len][len];
      for (int j = 0; j < len; j++) {
        for (int k = 0; k < len; k++) {
          nextMatrix[j][k] = matrix[j][k];
        }
      }
      if (nextMatrix[index][i] == 0) {
        nextMatrix[index][i] = 1;
        if (index == len - 1) {
          ans.add(writeAsList(nextMatrix));
        } else {
          for (int j = 1; j < len - index; j++) {
            if (i - j >= 0) {
              nextMatrix[index + j][i - j] = -1;
            }
            if (i + j < len) {
              nextMatrix[index + j][i + j] = -1;
            }
            nextMatrix[index + j][i] = -1;
          }
          markMatrix(nextMatrix, index + 1, ans);
        }
      }
    }
  }

  public List<String> writeAsList(byte[][] matrix) {
    List<String> list = new ArrayList<>();
    for (byte[] arr : matrix) {
      StringBuilder s = new StringBuilder();
      for (byte i: arr) {
        if (i == 1) {
          s.append('Q');
        } else {
          s.append('.');
        }
      }
      list.add(s.toString());
    }
    return list;
  }

  public static void main(String[] args) {
    Solution51 s = new Solution51();
    System.out.println(s.solveNQueens(9));
  }
}
