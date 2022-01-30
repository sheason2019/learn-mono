#include <iostream>
#include <string>
using namespace std;

struct Pizza {
  string company_name;
  double diameter;
  double weight;
};

int main()
{
  Pizza piz;
  cout << "Input company name: ";
  cin >> piz.company_name;
  cout << "Input diameter: ";
  cin >> piz.diameter;
  cout << "Input weight: ";
  cin >> piz.weight;
  cout << "Pizza {\n company_name: " << piz.company_name << "\n diameter: " << piz.diameter << "\n weight: " << piz.weight << "\n}\n";
}