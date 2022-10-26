import { useCallback, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  // 고윳값으로 사용될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);

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
      setTodos(todos.concat(todo));

      nextId.current += 1;
    },
    [todos],
  )

  const onRemove = useCallback(
    id => setTodos(todos.filter(todo => todo.id !== id)),
    [todos],
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
      const nextTodos = todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      );
      setTodos(nextTodos);
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
