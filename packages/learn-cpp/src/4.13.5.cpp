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
  CandyBar snake = {
      "Mocha Munch",
      2.3,
      350,
  };
  cout << "snake: {\n brand: " << snake.brand << "\n weight: " << snake.weight << "\n calorie: " << snake.calorie << "\n}\n";
}