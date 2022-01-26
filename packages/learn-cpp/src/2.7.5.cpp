#include <iostream>
using namespace std;
float celsius_to_fahrenheit(float celsius)
{
  return 1.8 * celsius + 32.0;
}
int main()
{
  cout << "Please enter a Celsius value:";
  float celsius;
  cin >> celsius;
  cout << celsius << " degrees Celsius is " << celsius_to_fahrenheit(celsius) << " degrees Fahrenheit" << endl;
}