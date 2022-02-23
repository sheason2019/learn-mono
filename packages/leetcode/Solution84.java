public class Solution84 {
  public int largestRectangleArea(int[] heights) {
    int[] temp = new int[heights.length + 2];
    int ans = 0;
    int lastFetch = -1;
    for (int i = 0; i < temp.length; i++) {
      if (i == 0 || i == temp.length - 1) {
        temp[i] = 0;
      } else {
        temp[i] = heights[i - 1];
      }
    }

    for (int i = 1; i < temp.length - 1; i++) {
      if (lastFetch == temp[i]) {
        continue;
      }
      lastFetch = temp[i];
      if (temp[i] == 0) {
        continue;
      }
      int leftEdge = i, rightEdge = i;
      while (temp[leftEdge - 1] >= temp[i]) {
        leftEdge--;
      }
      while (temp[rightEdge + 1] >= temp[i]) {
        rightEdge++;
      }
      int area = (rightEdge - leftEdge + 1) * temp[i];
      if (area > ans) {
        ans = area;
      }
    }

    return ans;
  }

  public static void main(String[] args) {
    System.out.println(new Solution84().largestRectangleArea(new int[] { 2, 1, 5, 6, 2, 3 }));
  }
}
