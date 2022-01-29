#include <iostream>
#include <cmath>
using namespace std;

int main()
{
  int inch, ft, pounds;
  cout << "Input your height in ft: ";
  cin >> ft;
  cout << "Input your height in inch: ";
  cin >> inch;
  cout << "Input your weight in pounds: ";
  cin >> pounds;
  const double ft_to_inch = 12.0, inch_to_meter = 0.0254, pounds_to_kg = 1.0 / 2.2;
  cout << "Your BMI is: " << (pounds * pounds_to_kg) / pow((ft * ft_to_inch + inch) * inch_to_meter, 2) << endl;
}