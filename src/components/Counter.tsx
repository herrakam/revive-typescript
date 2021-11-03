import React from "react";

type CounterType = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};
function Counter({ count, onIncrease, onDecrease }: CounterType) {
  return (
    <>
      <div className="showCount">{count}</div>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </>
  );
}

export default Counter;
