import java.util.ArrayList;
import java.util.List;

public class Solution46 {
    public List<List<Integer>> permute(int[] nums) {
        return recursion(new ArrayList<>(), nums);
    }

    public List<List<Integer>> recursion(List<List<Integer>> source, int[] nums) {
        if (nums.length == 0) {
            return source;
        }
        List<List<Integer>> nextSource = new ArrayList<>();
        int[] nextNums = new int[nums.length - 1];
        for (int i = 1; i < nums.length; i++) {
            nextNums[i - 1] = nums[i];
        }
        // 初始化
        if (source.size() == 0) {
            List<Integer> init = new ArrayList<>();
            init.add(nums[0]);
            nextSource.add(init);
            return recursion(nextSource, nextNums);
        } else {
            for (int i = 0; i < source.size(); i++) {
                List<Integer> originList = source.get(i);
                for (int j = 0; j <= originList.size(); j++) {
                    List<Integer> branchList = new ArrayList<>(originList);
                    branchList.add(j, nums[0]);
                    nextSource.add(branchList);
                }
            }
            return recursion(nextSource, nextNums);
        }
    }

    public static void main(String[] args) {
        Solution46 s = new Solution46();
        System.out.println(s.permute(new int[] { }));
    }
}
