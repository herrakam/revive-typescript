import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { RootState } from "../modules";
import { decrease, increase } from "../modules/counter";

function CounterConatiner() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  return (
    <Counter
      count={count}
      onDecrease={onDecrease}
      onIncrease={onIncrease}
    ></Counter>
  );
}

export default CounterConatiner;
