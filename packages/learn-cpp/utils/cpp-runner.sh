#!/bin/sh
filename=$2

if [ ! -d dist ]; then
  mkdir dist
fi

if [ $1 == --build ]
then
  filename=$2
  g++ src/$2.cpp -o dist/$2.out -std=c++11
else
  filename=$1
fi
./dist/$filename.out