#include <iostream>
#include <cstring>
using namespace std;

int main()
{
  char *word = new char[0];
  int count = 0;
  cout << "Enter words (to stop, type the word done):" << endl;
  while (strcmp("done", word) != 0)
  {
    cin >> word;
    cout << "Word: " << word << endl;
    count++;
  }
  count--;
  cout << "You entered a total of " << count << " words." << endl;
}