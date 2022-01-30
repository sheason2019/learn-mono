#include <iostream>
using namespace std;

int main()
{
  int year = 0, Daphne_earn = 100, Cleo_earn = 100;
  while (Cleo_earn <= Daphne_earn) {
    year++;
    Cleo_earn *= 1.05;
    Daphne_earn += 10;
  }
  cout << "In the " << year << " years, Daphne earn " << Daphne_earn << "; Cleo earn " << Cleo_earn << endl;
}