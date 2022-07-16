import React, { Component } from 'react';
import Styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

import type { IScriptSnapshot } from 'typescript';

const Container = Styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = Styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const InputContainer = Styled.div`
  display: flex;
`;

const ToDoListContainer = Styled.div`
  min-height: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

/*
function App() {
  const [toDo, setToDo] = useState(''); // toDo 는 string. 즉 state 값이군.
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = () => {
    if (toDo) {
      setToDoList([...toDoList, toDo]);
      setToDo('');
    }
  }

  const deleteToDo = (index: number): void => {
    let list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
  }
  
  return (
    <Container>
      <Contents>
        <ToDoListContainer data-testid="toDoList">
          {toDoList.map((item, index) =>
            <ToDoItem key={item} label={item} onDelete={() => deleteToDo(index)} />
          )}
        </ToDoListContainer>

        <InputContainer>
          <Input 
            placeholder="할 일을 입력해 주세요" 
            value={toDo}
            onChange={(text) => setToDo(text)}
          />
          <Button 
            label="추가"
            onClick={addToDo}
          />
        </InputContainer>
      </Contents>
    </Container>
  );
}
*/

interface Props {}

interface State {
  readonly toDo: string;
  readonly toDoList: string[];
  readonly error: boolean;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    console.log('constructor');
    super(props);
    
    this.state = {
      toDo: '',
      toDoList: [],
      error: false,
    }
  }

  private addToDo = (): void => {
    const { toDo, toDoList } = this.state;
    if (toDo) {
      this.setState({
        toDo: '',
        toDoList: [...toDoList, toDo],
      });
    }
  }

  private deleteToDo = (index: number): void => {
    let list = [...this.state.toDoList];
    list.splice(index, 1);
    this.setState({
      toDoList: list
    });
  }

  render() {
    console.log('render');
    const { toDo, toDoList, error } = this.state;

    return (
      <Container>
        {!error && (
          <Contents>
            <ToDoListContainer data-testid="toDoList">
              {toDoList.map((item, index) =>
                <ToDoItem key={item} label={item} onDelete={() => this.deleteToDo(index)} />
              )}
            </ToDoListContainer>

            <InputContainer>
              <Input 
                placeholder="할 일을 입력해 주세요" 
                value={toDo}
                onChange={(text) => this.setState({ toDo: text })}
              />
              <Button 
                label="추가"
                onClick={this.addToDo}
              />
            </InputContainer>
          </Contents>
        )}
      </Container>
    );
  }

  ////////////////////////////////////////////////////////////////
  // life cycle fn
  ////////////////////////////////////////////////////////////////

  // 왜 static 일까? class 함수라는 말인데..
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  // 이건 두 번 호출되는데..
  componentDidMount() {
    console.log('componentDidMount');
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('getSnapshotBeforeUpdate');

    return {
      testData: true,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: IScriptSnapshot) {
    console.log('componentDidUpdate');
  }

  shouldComponentUpdate(nextProps: Props, nextStage: State) {
    console.log('shouldComponentUpdate');
    return true;
    // return false; // 이렇게 했더니 테스트가 fail 했네. 좋아!!!
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: true,
    });
  }
}
export default App;
