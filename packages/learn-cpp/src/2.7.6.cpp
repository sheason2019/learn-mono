#include <iostream>
using namespace std;
double light_year_to_astronomical_units(double light_year)
{
  return 63240 * light_year;
}
int main()
{
  double light_year;
  cout << "Enter the number of light years: ";
  cin >> light_year;
  cout << light_year << " light year = " << light_year_to_astronomical_units(light_year) << " astronomical units." << endl;
}