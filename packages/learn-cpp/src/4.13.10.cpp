#include <iostream>
#include <array>
using namespace std;

int main()
{
  double avg, sum = 0;
  const int times = 3;
  array<double, times> scores;
  for (int i = 0; i < times; i++) {
    cout << "Please input your race score(" << i << " / 3): ";
    cin >> scores[i];
    sum += scores[i];
  }
  avg = sum / times;
  cout << "Your input time is: " << times << "Your avg score is: " << avg << endl;
}