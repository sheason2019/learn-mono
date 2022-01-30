#include <iostream>
using namespace std;

int main()
{
  const char *month_name[] = {
    "January",
    "February",
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  };
  int seals_count[12], sum = 0;
  for (int i = 0; i < 12; i++) {
    cout << "The seals count in " << month_name[i] << " is: ";
    cin >> seals_count[i];
    sum += seals_count[i];
  }
  cout << "All the seals amount in the year is: " << sum << endl;
}