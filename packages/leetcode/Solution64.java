public class Solution64 {
  public int minPathSum(int[][] grid) {
    int rowNum = grid.length, colNum = grid[0].length;
    int[][] pathTo = new int[rowNum][colNum];
    for (int i = 0; i < rowNum; i++) {
      for (int j = 0; j < colNum; j++) {
        if (i == 0 && j == 0) {
          pathTo[i][j] = grid[i][j];
        } else if (i == 0) {
          pathTo[i][j] = pathTo[i][j - 1] + grid[i][j];
        } else if (j == 0) {
          pathTo[i][j] = pathTo[i - 1][j] + grid[i][j];
        } else {
          pathTo[i][j] = Math.min(pathTo[i - 1][j], pathTo[i][j - 1]) + grid[i][j];
        }
      }
    }
    return pathTo[rowNum - 1][colNum - 1];
  }

  public static void main(String[] args) {
    Solution64 s = new Solution64();
    System.out.println(s.minPathSum(new int[][] { { 1, 2, 3 }, { 4, 5, 6 } }));
  }
}
