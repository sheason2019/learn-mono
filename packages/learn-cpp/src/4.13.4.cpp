#include <iostream>
#include <string>
using namespace std;

int main()
{
  string first_name, last_name;
  cout << "Enter your first name: ";
  getline(cin, first_name);
  cout << "Enter your last name: ";
  getline(cin, last_name);
  string str = last_name + ", " + first_name;
  cout << "Here's the infomation in a single string: " << str << endl;
}