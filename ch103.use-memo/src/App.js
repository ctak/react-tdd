import React, { useRef, useState, useMemo } from 'react';

import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

// let nextId = 4;

// useRef 를 사용한다는 것은, Component 가 state, props 로 다시 렌더링 될 때, function 이 다시 실행되는 것과 같으니까,
// 변수를 유지살 수 있는 방법이 필요함.
// 그렇다면 closure 처럼, 먼가 방법이 필요하겠고, 함수는 다시 실행되지만, 내부의 값은 유지되어야 한다.
// 그래서 리액트에서는 useRef() 로 closure 객체를 만든 것이다.

// useMemo 를 사용하여 연산한 값 재사용하기. WHY?
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length; // return 이 Number 네.
}
function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // let nextId = 4;
  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: '',
    });

    nextId.current += 1;
  }
  const onRemove = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }
  const onToggle = (id) => {
    setUsers(
      users.map(user => (
        user.id === id
          ? { ...user, ['active']: !user.active }
          : user
      ))
    );
  }
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);
  // 컴포넌트에서 이런 경우는 굉장히 많겠지.
  // 이런 경우를 없애려면, useMemo()를 사용한다는 것이군.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <hr />
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
