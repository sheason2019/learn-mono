public class Solution34 {
  public static int[] searchRange(int[] nums, int target) {
    int left = 0, right = nums.length - 1, center = nums.length / 2;
    try {
      int[] lrc;
      if (nums[left] == target) {
        center = left;
        lrc = new int[]{left, right, center};
      } else if (nums[right] == target) {
        center = right;
        lrc = new int[]{left, right, center};
      } else {
        lrc = recursion(left, right, center, nums, target);
      }
      int leftEdge, rightEdge;
      if (nums[lrc[0]] == target) {
        leftEdge = lrc[0];
      } else {
        leftEdge = searchEdge(lrc[0], lrc[2], (lrc[0] + lrc[2]) / 2, nums, target, true);
      }
      if (nums[lrc[1]] == target) {
        rightEdge = lrc[1];
      } else {
        rightEdge = searchEdge(lrc[2], lrc[1], (lrc[2] + lrc[1]) / 2, nums, target, false);
      }
      return new int[] { leftEdge, rightEdge };
    } catch (Exception e) {
      return new int[] { -1, -1 };
    }
  }

  public static int[] recursion(int left, int right, int center, int[] nums, int target) throws Exception {
    if (nums[center] == target) {
      return new int[] { left, right, center };
    }
    if (right - left < 2) {
      throw new Exception();
    }
    if (nums[center] > target) {
      return recursion(left, center, (left + center) / 2, nums, target);
    } else {
      return recursion(center, right, (center + right) / 2, nums, target);
    }
  }

  public static int searchEdge(int left, int right, int center, int[] nums, int target, boolean isLeft) {
    if (right - left < 2) {
      if (isLeft) {
        // 如果递归是在寻找左边界
        return right;
      } else {
        // 如果递归是在寻找右边界
        return left;
      }
    }
    if (isLeft) {
      if (nums[center] == target) {
        return searchEdge(left, center, (left + center) / 2, nums, target, isLeft);
      } else {
        return searchEdge(center, right, (right + center) / 2, nums, target, isLeft);
      }
    } else {
      if (nums[center] == target) {
        return searchEdge(center, right, (right + center) / 2, nums, target, isLeft);
      } else {
        return searchEdge(left, center, (left + center) / 2, nums, target, isLeft);
      }
    }
  }

  public static void main(String[] args) {
    int[] test = new int[] {1, 3};
    for (int i : searchRange(test, 1)) {
      System.out.print(i + ", ");
    }
    System.out.println();
  }
}
