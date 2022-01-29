#include <iostream>
using namespace std;

int main()
{
  cout << "Input your height in inch: ";
  int inch;
  cin >> inch;
  const int CONVERSION_FACTORS = 12;
  cout << "Your height in ft is: " << (double)inch / CONVERSION_FACTORS << endl;
  return 0;
}