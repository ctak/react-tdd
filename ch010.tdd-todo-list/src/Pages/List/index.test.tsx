import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { List } from './index';

import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('<List />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();

    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    const { container } = render(
      <Router navigator={history} location={"/"}>
        <List />
      </Router>
    );

    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();

    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();

    expect(screen.getAllByText('삭제').length).toBe(3);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes toDo item', () => {
    const history = createMemoryHistory();

    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');
    
    render(
      <Router navigator={history} location={"/"}>
        <List />
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();

    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);

    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });

  it('moves to detail page', () => {
    const history = createMemoryHistory();

    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };
    
    render(
      <Router navigator={history} location={"/"}>
        <TestComponent />
        <List />
      </Router>
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem1 = screen.getByText('ToDo 2');
    expect(toDoItem1.getAttribute('href')).toBe('/detail/1');

    fireEvent.click(toDoItem1);
    setTimeout(() => {
      expect(url.textContent).toBe('/detail/1');
    });
    
  });

  it('moves to add page', () => {
    const history = createMemoryHistory();  

    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <Router navigator={history} location={"/"}>
        <TestComponent />
        <List />
      </Router>,
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    expect(addButton.getAttribute('href')).toBe('/add');

    fireEvent.click(addButton);
    setTimeout(() => expect(url.textContent).toBe('/add'));

  });

})