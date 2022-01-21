public class Solution45 {
    public int jump(int[] nums) {
        int curDistance = 0, nextDistance = 0, step = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            nextDistance = Math.max(nums[i] + i, nextDistance);
            if (i == curDistance) {
                curDistance = nextDistance;
                step++;
            }
        }

        return step;
    }

    public static void main(String[] args) {
        Solution45 s = new Solution45();
        System.out.println(s.jump(new int[] { 2, 3, 1, 1, 4 }));
    }
}
