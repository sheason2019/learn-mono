#include <iostream>
using namespace std;

struct car
{
  string company_name;
  int productive_year;
};

int main()
{
  int car_num;
  cout << "How many cars do you wish to catalog? ";
  cin >> car_num;
  cin.get();
  car *cars_info = new car[car_num];
  for (int i = 0; i < car_num; i++)
  {
    cout << "Car #" << i + 1 << endl;
    cout << "Please enter the make: ";
    getline(cin, cars_info[i].company_name);
    cout << "Please enter the year made: ";
    cin >> cars_info[i].productive_year;
    cin.get();
  }
  cout << "Here is your collection: " << endl;
  for (int i = 0; i < car_num; i++) {
    cout << cars_info[i].productive_year << " " << cars_info[i].company_name << endl;
  }
}