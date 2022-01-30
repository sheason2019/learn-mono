#include <iostream>
using namespace std;

int main()
{
  int sum = 0;
  int input;
  do
  {
    cout << "Please input a number: ";
    cin >> input;
    sum += input;
    if (input != 0)
      cout << "Now the sum of numbers is: " << sum << endl;
    else
      cout << "Recieve number 0, program exit." << endl;
  } while (input != 0);
}