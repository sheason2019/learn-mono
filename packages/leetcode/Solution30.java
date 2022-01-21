import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution30 {
  public static List<Integer> findSubstring(String s, String[] words) {
    List<Integer> result = new ArrayList<Integer>();
    Arrays.sort(words);
    int wordLength = words[0].length();
    for (int i = 0; i < s.length() - words.length * wordLength + 1; i++) {
      String[] temp = new String[words.length];
      for (int j = 0; j < words.length; j++) {
        temp[j] = s.substring(j * wordLength + i, j * wordLength + wordLength + i);
      }
      Arrays.sort(temp);
      boolean isResult = true;
      for (int j = 0; j < words.length; j++) {
        if (!words[j].equals(temp[j])) {
          isResult = false;
          break;
        }
      }
      if (isResult) result.add(i);
    }
    return result;
  }
  public static void main(String[] args) {
    List<Integer> test;
    test = findSubstring("wordgoodgoodgoodbestword", new String[]{ "word","good","best","good" });
    for (Integer i : test) {
      System.out.println(i);
    }
  }
}
