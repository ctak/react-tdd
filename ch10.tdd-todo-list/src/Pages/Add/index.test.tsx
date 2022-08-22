import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Add } from './index';

describe('<Add />', () => {
  it('renders component correctly', () => {
    render(<Add />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();
  });

  it('add a new ToDo and redirect to the root page', () => {
    localStorage.setItem('ToDoList', '["Old ToDo"]');

    render(<Add />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요'); 
    const button = screen.getByText('추가'); 
    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);
    expect(localStorage.getItem('ToDoList')).toBe('["Old ToDo","New ToDo"]');
  });
});
