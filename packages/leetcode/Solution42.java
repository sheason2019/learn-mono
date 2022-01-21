
public class Solution42 {
  public static int trap(int[] height) {
    /** 将雨水的状态分为void和static，使用tomb指代记录void雨水数量时遇到的最高的数组项 */
    int staticRainNum = 0, voidRainNum = 0, tomb = 0, tombVoidRainNum = 0;
    for (int i = 0; i < height.length; i++) {
      // void的高度不为0 并且 i不是数组的最后一个元素
      if (height[i] != 0 && i != height.length - 1) {
        tomb = i + 1;
        for (int j = i + 1; j < height.length; j++) {
          // 记录最高项
          if (height[j] > height[tomb]) {
            tomb = j;
          }
          if (height[j] < height[i]) {
            voidRainNum += height[i] - height[j];
            if (tomb == j) {
              tombVoidRainNum = voidRainNum;
            }
            if (j == height.length - 1) {
              // void雨水塌缩算法
              staticRainNum += tombVoidRainNum - (height[i] - height[tomb]) * (tomb - i);
              voidRainNum = 0;
              i = tomb - 1;
            }
          } else {
            staticRainNum += voidRainNum;
            voidRainNum = 0;
            i = j - 1;
            break;
          }
        }
      }
    }
    return staticRainNum;
  }

  public static void main(String[] args) {
    System.out.println(trap(new int[] { 4, 2, 0, 3, 2, 5 }));
  }
}
