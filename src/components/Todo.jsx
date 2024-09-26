import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/middlewares/todoMiddleware";

// import getTodos from "../redux/middlewares/todoMiddleware";

const Todo = () => {
  const { todoList, status, error } = useSelector((state) => state.todo);
  // console.log("🚀 ~ Todo ~ todoList:", todoList);
  const dispatch = useDispatch();
  const isUnmount = useRef(false);

  useEffect(() => {
    // call api thông qua middleware
    if (!isUnmount.current) {
      dispatch(getTodos("ok"));
    }

    return () => {
      /**
       * component đã bị unmount trong khi res chưa được trả về thì phải huỷ call api
       * nhưng nếu res đã trả về rồi và component đã bị unmount -> không cho setState or dispatch store
       */
      isUnmount.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status === "pending" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {todoList?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
