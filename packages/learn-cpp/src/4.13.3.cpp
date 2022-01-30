#include <iostream>
#include <cstring>
using namespace std;

int main()
{
  char first_name[20], last_name[20];
  cout << "Enter your first name: ";
  cin >> first_name;
  cout << "Enter your last name: ";
  cin >> last_name;
  char str[41];
  strcpy(str, last_name);
  strcat(str, ",");
  strcat(str, first_name);
  cout << "Here's the infomation in a single string: " << str << endl;
}