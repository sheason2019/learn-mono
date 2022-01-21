import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution49 {
  public List<List<String>> groupAnagrams(String[] strs) {
    HashMap<String, List<String>> map = new HashMap<>();
    for (String str: strs) {
      char[] chars = str.toCharArray();
      Arrays.sort(chars);
      String key = String.valueOf(chars);
      if (!map.containsKey(key)) {
        List<String> list = new ArrayList<>();
        list.add(str);
        map.put(key, list);
      } else {
        List<String> list = map.get(key);
        list.add(str);
      }
    }
    List<List<String>> result = new ArrayList<>();
    for (Map.Entry<String, List<String>> entry : map.entrySet()) {
      result.add(entry.getValue());
    }
    return result;
  }
  public static void main(String[] args) {
    Solution49 s = new Solution49();
    System.out.println(s.groupAnagrams(new String[]{ "eat", "tea", "tan", "ate", "nat", "bat" }));
  }
}
