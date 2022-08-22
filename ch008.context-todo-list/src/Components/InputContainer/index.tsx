import React, { useState, useContext } from 'react';
import Styled from 'styled-components';

import { Button } from 'Components/Button';
import { Input } from 'Components/Input';

import { ToDoListContext } from 'Contexts';

const Container = Styled.div`
  display: flex;
`;

/**
 * 큰 차이점이 있다면 컨텍스트를 사용하지 않을 때는 부모 컴포넌트의 연계가 항상 필요했는데,
 * Props 말이지.
 */
// interface Props {
//   readonly toDo?: string;
//   readonly onChange?: (text: string) => void;
//   readonly onAdd?: () => void;
// }
// export const InputContainer = ({ toDo, onChange, onAdd }: Props) => {
//   return (
//     <Container>
//       <Input
//         placeholder="할 일을 입력해 주세요"
//         value={toDo}
//         onChange={onChange}
//       />
//       <Button
//         label="추가"
//         onClick={onAdd}
//       />
//     </Container>
//   );
// };

export const InputContainer = () => {
  const [toDo, setToDo] = useState('');
  const { addToDo } = useContext(ToDoListContext);
  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요"
        value={toDo}
        onChange={setToDo}
      />
      <Button
        label="추가"
        onClick={() => {
          addToDo(toDo);
          setToDo('');
        }}
      />
    </Container>
  );
};
