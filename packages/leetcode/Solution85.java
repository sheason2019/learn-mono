public class Solution85 {
  public int maximalRectangle(char[][] matrix) {
    int crossCount = 0;
    int ans = 0;
    for (int i = 0; i < matrix.length; i++) {
      for (int height = 1; height < matrix.length - i + 1; height++) {
        crossCount = 0;
        for (int j = 0; j < matrix[0].length; j++) {
          boolean valid = true;
          for (int k = 0; k < height; k++) {
            if (matrix[i + k][j] == '0') {
              valid = false;
            }
          }
          if (valid) {
            crossCount++;
            ans = Math.max(ans, height * crossCount);
          } else {
            crossCount = 0;
          }
        }
      }
    }
    return ans;
  }

  public static void main(String[] args) {
    System.out.println(new Solution85().maximalRectangle(new char[][] {{'0'}}));
  }
}
