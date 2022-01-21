public class Solution52 {
  int count = 0;
  public int totalNQueens(int n) {
    markMatrix(new byte[n][n], 0);
    return count;
  }

  public void markMatrix(byte[][] matrix, int index) {
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
          count++;
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
          markMatrix(nextMatrix, index + 1);
        }
      }
    }
  }

  public static void main(String[] args) {
    Solution52 s = new Solution52();
    System.out.println(s.totalNQueens(4));
  }
}
