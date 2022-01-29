#include <iostream>
using namespace std;

int main()
{
  long world, US;
  double rate;
  cout << "Enter the world's population: ";
  cin >> world;
  cout << "Enter the population of the US: ";
  cin >> US;
  rate = (double)US / world;
  cout << "The population of the US is " << rate * 100 << "% of the world population." << endl;
}