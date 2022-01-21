import { useEffect, useRef } from "preact/hooks";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const SmokeCircle = styled.div`
  position: absolute;
  width: 6rem;
  height: 6rem;
  background-color: rgba(0, 0, 100, 0.25);
  border-radius: 50%;
  transform: scale(0);
`;

const MarginTitle = styled.h2`
  transform: translateY(6rem);
`;

const animateData = [
  { transform: 'scale(0)' },
  { transform: 'scale(1)' },
  { transform: 'scale(0)' },
];
const circle1Timing = {
  duration: 2000,
  iterations: Infinity,
};
const circle2Timing = {
  duration: 2000,
  iterations: Infinity,
  delay: 800,
}

export function FetchingSnipper() {
  const circle1 = useRef<HTMLDivElement>(null);
  const circle2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    circle1.current?.animate( animateData, circle1Timing);
    circle2.current?.animate( animateData, circle2Timing);
  }, []);
  return (
    <Root>
      <SmokeCircle ref={circle1} />
      <SmokeCircle ref={circle2} />
      <MarginTitle>Fetching User...</MarginTitle>
    </Root>
  );
}