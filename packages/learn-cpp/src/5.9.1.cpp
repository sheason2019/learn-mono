#include <iostream>
using namespace std;

int main()
{
  int start, end, sum = 0;
  cout << "Please input loop start index: ";
  cin >> start;
  cout << "Please input loop end index: ";
  cin >> end;
  for (int i = start; i <= end; i++) 
    sum += i;
  cout << "Number sum between " << start << " and " << end << " is: " << sum << endl;
}