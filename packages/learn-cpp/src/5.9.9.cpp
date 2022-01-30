#include <iostream>
#include <string>
using namespace std;

int main()
{
  string str;
  int count = 0;
  cout << "Enter words (to stop, type the word done):" << endl;
  while (str != "done")
  {
    cin >> str;
    count++;
  }
  count--;
  cout << "You entered a total of " << count << " words." << endl;
}