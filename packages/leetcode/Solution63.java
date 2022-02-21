public class Solution63 {
  public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    int rowNum = obstacleGrid.length, colNum = obstacleGrid[0].length;
    if (obstacleGrid[0][0] == 1)
      return 0;
    int[][] pathTo = new int[rowNum][colNum];
    for (int i = 0; i < rowNum; i++) {
      for (int j = 0; j < colNum; j++) {
        if (obstacleGrid[i][j] == 1) {
          pathTo[i][j] = 0;
          continue;
        }
        if (i == 0 && j == 0) {
          pathTo[i][j] = 1;
        } else if (i == 0) {
          pathTo[i][j] = pathTo[i][j - 1];
        } else if (j == 0) {
          pathTo[i][j] = pathTo[i - 1][j];
        } else {
          pathTo[i][j] = pathTo[i - 1][j] + pathTo[i][j - 1];
        }
      }
    }
    return pathTo[rowNum - 1][colNum - 1];
  }

  public static void main(String[] args) {
    Solution63 s = new Solution63();
    System.out.println(s.uniquePathsWithObstacles(new int[][] { { 0, 0 }, { 1, 1 }, { 0, 0 } }));
  }
}
