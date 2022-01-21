import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HelloWorld {
  public static List<String> main(String[] args) {
    String digits = "23";
    if (digits.length() == 0) return Arrays.asList(new String[0]);
    Map<Character, Character[]> numberMap = new HashMap<>();
    numberMap.put('2', new Character[]{'a', 'b', 'c'});
    numberMap.put('3', new Character[]{'d', 'e', 'f'});
    numberMap.put('4', new Character[]{'g', 'h', 'i'});
    numberMap.put('5', new Character[]{'j', 'k', 'l'});
    numberMap.put('6', new Character[]{'m', 'n', 'o'});
    numberMap.put('7', new Character[]{'p', 'q', 'r', 's'});
    numberMap.put('8', new Character[]{'t', 'u', 'v'});
    numberMap.put('9', new Character[]{'w', 'x', 'y', 'z'});
    String[] result = null;

    char[] digitsArray = digits.toCharArray();
    for (char c : digitsArray) {
      Character[] charArr = numberMap.get(c);
      if (result == null) { // result为空时直接将数组赋予result
        String[] temp = new String[charArr.length];
        for(int i = 0; i < charArr.length; i++) {
          temp[i] = charArr[i].toString();
        }
        result = temp;
      } else {
        String[] temp = new String[charArr.length * result.length];
        for(int i = 0; i < result.length; i++) {
          for (int j = 0; j < charArr.length; j++) {
            temp[i * charArr.length + j] = result[i] + charArr[j].toString();
          }
        }
        result = temp;
      }
    }
    return Arrays.asList(result);
  }
}

