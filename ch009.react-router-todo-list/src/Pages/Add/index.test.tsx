import React from "react";
import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Add } from './index';

import { ToDoListProvider } from 'Contexts';
import exp from "constants";

describe('<Add />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router navigator={history} location={"/add"}>
        <Add />
      </Router>
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  })

  it('add a new ToDo and redirect to the root page', () => {
    const history = createMemoryHistory();

    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <ToDoListProvider>
          <div>{pathname}</div>
          <Add />
        </ToDoListProvider>
      );
    }

    render(
      <Router navigator={history} location={"/add"}>
        <TestComponent />
      </Router>
    );

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);

    expect(localStorage.getItem('ToDoList')).toBe('["New ToDo"]'); // 이 부분은 동기
    setTimeout(() => {
      expect(pathName.textContent).toBe("/"); // 이 부분은 비동기
    });

  })
});