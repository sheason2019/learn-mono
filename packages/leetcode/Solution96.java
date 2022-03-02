public class Solution96 {
  public int numTrees(int n) {
    int[] G = new int[n + 1];
    G[0] = 1;
    G[1] = 1;
    for (int i = 2; i < n + 1; i++) {
      for (int j = 1; j < i + 1; j++) {
        G[i] += G[j - 1] * G[i - j];
      }
    }
    return G[n];
  }

  public static void main(String[] args) {
    Solution96 s = new Solution96();
    int ans = s.numTrees(3);
    System.out.println(ans);
  }
}
