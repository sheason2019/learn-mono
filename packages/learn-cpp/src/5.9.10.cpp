#include <iostream>
using namespace std;

int main()
{
  int row;
  cout << "Enter number of rows: ";
  cin >> row;
  for (int i = 0; i < row; i++)
  {
    for (int j = 0; j < row; j++)
    {
      if (j < row - i - 1)
      {
        cout << '.';
      }
      else
      {
        cout << '*';
      }
    }
    cout << endl;
  }
}