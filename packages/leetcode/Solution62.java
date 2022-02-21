public class Solution62 {
  public int uniquePaths(int m, int n) {
    int[][] pathTo = new int[m][n];
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (i == 0 || j == 0) {
          pathTo[i][j] = 1;
        } else {
          pathTo[i][j] = pathTo[i - 1][j] + pathTo[i][j - 1];
        }
      }
    }
    return pathTo[m - 1][n - 1];
  }

  public static void main(String[] args) {
    Solution62 s = new Solution62();
    System.out.println(s.uniquePaths(51, 9));
  }
}
