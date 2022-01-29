#include <iostream>
using namespace std;

int main()
{
  double oil_consumption_in_european;
  cout << "Please input oil consumption in (L / 100 km): ";
  cin >> oil_consumption_in_european;
  const double L_per_gallon = 3.785, mile_per_100km = 62.14;
  cout << "oil consumption in (miles / gallon) is: " << 1.0 / ((oil_consumption_in_european / L_per_gallon) / mile_per_100km) << endl;
}