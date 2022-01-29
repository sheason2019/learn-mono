#include <iostream>
using namespace std;

int main()
{
  long input;
  cout << "Enter the number of seconds: ";
  cin >> input;
  const int seconds_per_minute = 60, minutes_per_hour = 60, hours_per_day = 24;
  int seconds, minutes, hours, days;
  seconds = input % seconds_per_minute;
  minutes = (input / seconds_per_minute) % minutes_per_hour;
  hours = (input / seconds_per_minute / minutes_per_hour) % hours_per_day;
  days = (input /seconds_per_minute / minutes_per_hour / hours_per_day);
  cout << input << " seconds = " << days << " days, " << hours << " hours, " << minutes << " minutes, " << seconds << " seconds" << endl;
}