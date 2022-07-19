import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { ToDoList } from './index';

describe('<ToDoList />', () => {
    it('renders component correctly', () => {
        const { container } = render(
            <ToDoListProvider>
                <ToDoList />
            </ToDoListProvider>
        );

        const toDoList = screen.getByTestId('toDoList');
        expect(toDoList).toBeInTheDocument();
        expect(toDoList.firstChild).toBeNull();

        expect(container).toMatchSnapshot();
    });

    it('shows toDo List', () => {
        localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

        render(
            <ToDoListProvider>
                <ToDoList />
            </ToDoListProvider>
        );

        expect(screen.getByText('ToDo 1')).toBeInTheDocument();
        expect(screen.getByText('ToDo 2')).toBeInTheDocument();
        expect(screen.getByText('ToDo 3')).toBeInTheDocument();
        expect(screen.getAllByText('삭제').length).toBe(3);
    })
})