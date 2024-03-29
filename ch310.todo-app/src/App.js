import { useCallback, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos); // 함수를 던졌네.

  // 고윳값으로 사용될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      };

      // setTodos([
      //   ...todos,
      //   todo,
      // ]);
      setTodos(todos => todos.concat(todo));

      nextId.current += 1;
    },
    [],
  )

  const onRemove = useCallback(
    id => setTodos(todos => todos.filter(todo => todo.id !== id)),
    [],
  )

  const onToggle = useCallback(
    id => {
      // const nextTodos = todos.map((todo) => {
      //   if (todo.id === id) {
      //     return {
      //       ...todo,
      //       checked: !todo.checked,
      //     }
      //   } else {
      //     return todo;
      //   }
      // });

      // const nextTodos = todos.map(todo =>
      //   todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      // );
      // setTodos(nextTodos);

      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
