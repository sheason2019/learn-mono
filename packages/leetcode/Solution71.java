public class Solution71 {
  public String simplifyPath(String path) {
    String[] keys = path.split("/");
    boolean[] dirtMap = new boolean[keys.length];
    StringBuilder ans = new StringBuilder();
    for (int i = 0; i < keys.length; i++) {
      if (".".equals(keys[i])) {
        dirtMap[i] = true;
      } else if ("..".equals(keys[i])) {
        dirtMap[i] = true;
        for (int j = i; j >= 0; j--) {
          if (!dirtMap[j]) {
            dirtMap[j] = true;
            break;
          }
        }
      } else if (keys[i].length() == 0) {
        dirtMap[i] = true;
      }
    }
    for (int i = 0; i < keys.length; i++) {
      if (!dirtMap[i]) {
        ans.append('/');
        ans.append(keys[i]);
      }
    }
    if (ans.length() == 0) {
      ans.append('/');
    }

    return ans.toString();
  }

  public static void main(String[] args) {
    System.out.println(new Solution71().simplifyPath("a//b////c/d//././/.."));
  }
}
