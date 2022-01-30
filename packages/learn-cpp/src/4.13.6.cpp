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
  CandyBar snakes[] = {
      {
          "Mocha Munch1",
          2.1,
          150,
      },
      {
          "Mocha Munch2",
          2.2,
          250,
      },
      {
          "Mocha Munch3",
          2.3,
          350,
      },
  };
  for (int i = 0; i < sizeof(snakes) / sizeof(CandyBar); i++)
    cout << "snake: {\n brand: " << snakes[i].brand << "\n weight: " << snakes[i].weight << "\n calorie: " << snakes[i].calorie << "\n}\n";
}