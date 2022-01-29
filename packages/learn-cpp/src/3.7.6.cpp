#include <iostream>
using namespace std;

void program_in_american_style() {
  cout << "Input distance(in mile):";
  double mile, oil_consumption;
  cin >> mile;
  cout << "Input oil consumption(in gallon):";
  cin >> oil_consumption;
  cout << "The answer is: " << mile / oil_consumption << " mile / gallon" << endl;
}
void program_in_european_style() {
  cout << "Input distance(in km):";
  double kilometer, oil_consumption;
  cin >> kilometer;
  cout << "Input oil consumption(in L):";
  cin >> oil_consumption;
  cout << "The answer is: " << oil_consumption / (100 * kilometer) << " L / 100 km" << endl;
}


int main()
{
  cout << "Choose your unit style:" << endl << "1. mile / gallon" << endl << "2. L / 100 km" << endl << "Which one would you like?(input number) ";
  int style;
  cin >> style;
  switch (style) {
    case 1: program_in_american_style();break;
    case 2: program_in_european_style();break;
    default: cout << "Unit style error!"; return 0;
  }
}