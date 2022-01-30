#include <iostream>
#include <string>
using namespace std;

struct CandyBar
{
  string brand;
  double weight;
  int calorie;
};

int main()
{
  CandyBar *snakes = new CandyBar[3];
  snakes[0].brand = "Mocha Munch1";
  snakes[0].weight = 2.1;
  snakes[0].calorie = 150;
  snakes[1].brand = "Mocha Munch2";
  snakes[1].weight = 2.2;
  snakes[1].calorie = 250;
  snakes[2].brand = "Mocha Munch3";
  snakes[2].weight = 2.3;
  snakes[2].calorie = 350;
  
  for (int i = 0; i < 3; i++)
    cout << "snake: {\n brand: " << snakes[i].brand << "\n weight: " << snakes[i].weight << "\n calorie: " << snakes[i].calorie << "\n}\n";
}