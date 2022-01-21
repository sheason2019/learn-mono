import React from "react";
import styled from "styled-components";

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Counter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <Root>
      <button onClick={() => setCount(count - 1)}>-</button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </Root>
  );
};

export default Counter;
