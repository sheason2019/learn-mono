import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution68 {
  public String mergeString(String[] list, int maxWidth, int fontCount, boolean isEnd) {
    int spaceNum;
    if (!isEnd) {
      spaceNum = maxWidth - fontCount;
    } else {
      spaceNum = maxWidth - fontCount + list.length - 1;
    }
    int leftSpace;
    if (list.length > 1) {
      leftSpace = spaceNum % (list.length - 1);
    } else {
      leftSpace = 0;
    }

    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < list.length; i++) {
      builder.append(list[i]);
      if (i != list.length - 1) {
        builder.append(' ');
        if (!isEnd) {
          for (int j = 0; j < spaceNum / (list.length - 1); j++) {
            builder.append(' ');
          }
          if (leftSpace != 0) {
            builder.append(' ');
            leftSpace--;
          }
        }
      }
    }

    if (list.length == 1 || isEnd) {
      while(builder.length() < maxWidth) {
        builder.append(' ');
      }
    }
    return builder.toString();
  }

  public List<String> fullJustify(String[] words, int maxWidth) {
    List<String> ans = new ArrayList<>();
    int index = 0;
    int end = 0;
    int fontCount = 0;
    while (index < words.length && end < words.length) {
      int nextFontCount = fontCount;
      if (nextFontCount != 0) {
        nextFontCount++;
      }
      nextFontCount += words[end].length();
      if (nextFontCount > maxWidth) {
        ans.add(mergeString(Arrays.copyOfRange(words, index, end), maxWidth, fontCount, end == words.length));
        index = end;
        fontCount = 0;
      } else {
        end++;
        fontCount = nextFontCount;
      }
    }
    if (index != end) {
      ans.add(mergeString(Arrays.copyOfRange(words, index, end), maxWidth, fontCount, end == words.length));
      index = end;
    }
    return ans;
  }

  public static void main(String[] args) {
    List<String> ans = new Solution68()
        .fullJustify(new String[] { "ask", "not", "what", "your", "country", "can", "do", "for", "you", "ask", "what",
            "you", "can", "do", "for", "your", "country" }, 16);
    System.out.println(Arrays.toString(ans.toArray()));
    System.out.println(ans.get(ans.size() - 1).length());
  }
}
