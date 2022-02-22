public class Solution72 {
  public int minDistance(String word1, String word2) {
    int[][] matrix = new int[word1.length() + 1][word2.length() + 1];
    for (int i = 0; i < matrix.length; i++) {
      for (int j = 0; j < matrix[0].length; j++) {
        if (i == 0) {
          matrix[i][j] = j;
        } else if (j == 0) {
          matrix[i][j] = i;
        } else if (word1.charAt(i - 1) != word2.charAt(j - 1)) {
          matrix[i][j] = 1 + Math.min(matrix[i - 1][j], Math.min(matrix[i][j - 1], matrix[i - 1][j - 1]));
        } else {
          matrix[i][j] = matrix[i - 1][j - 1];
        }
      }
    }
    return matrix[word1.length()][word2.length()];
  }

  public static void main(String[] args) {
    System.out.println(new Solution72().minDistance("horse", "ros"));
  }
}
