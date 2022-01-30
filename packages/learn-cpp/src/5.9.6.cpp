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
      "December"};
  int seals_count[3][12], sum_of_year[3], sum = 0;
  for (int year = 0; year < 3; year++)
  {
    sum_of_year[year] = 0;
    for (int i = 0; i < 12; i++)
    {
      cout << "The seals count in " << month_name[i] << ", year " << year + 1 << " is: ";
      cin >> seals_count[year][i];
      sum_of_year[year] += seals_count[year][i];
    }
  }
  for (int year = 0; year < 3; year++)
  {
    cout << "All the seals amount in the year " << year + 1 << " is : " << sum_of_year[year] << endl;
    sum += sum_of_year[year];
  }

  cout << "All the seals amount in the 3 years is: " << sum << endl;
}