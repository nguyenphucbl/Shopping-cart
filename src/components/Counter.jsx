import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../redux/slices/counterSlice";
export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const plus = () => {
    dispatch(increment());
  };
  const minus = () => {
    dispatch(decrement());
  };
  const byAmount = () => {
    dispatch(incrementByAmount(10));
  };
  return (
    <div>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <button onClick={plus}>Increment</button>
      <button onClick={minus}>Decrement</button>
      <button onClick={byAmount}>10</button>
    </div>
  );
}
