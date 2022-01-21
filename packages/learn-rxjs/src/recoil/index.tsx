import React, { useState } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const randomNumberState = atom<number>({
  key: "RandomNumberState",
  default: 0,
});

const currentRandomNumberState = selector({
  key: "CurrentRandomNumberState",
  get: async ({ get }) => {
    const val = get(randomNumberState);
    const response = await fetch("http://localhost:4396/random-number?val=" + val);
    const num = await response.text();
    return num;
  },
});

function CharacterCounter() {
  const [count, setCount] = useRecoilState(randomNumberState);
  const updateCountValue = () => {
    setCount(count + 1);
  };
  return (
    <>
      <button onClick={updateCountValue}>Get Random</button>
      <React.Suspense fallback={<div>Loading</div>}>
        <Random />
      </React.Suspense>
    </>
  );
}

function Random() {
  const count = useRecoilValue(randomNumberState);
  const randomNum = useRecoilValue(currentRandomNumberState);
  return (
    <div>
      {count} - {randomNum}
    </div>
  );
}

export default CharacterCounter;
