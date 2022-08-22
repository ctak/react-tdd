import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoListProvider } from 'Contexts';
import { ToDoList } from './index';

import { BrowserRouter as Router, useLocation } from 'react-router-dom';

describe('<ToDoList />', () => {
    it('renders component correctly', () => {
        const { container } = render(
            <Router>
                <ToDoListProvider>
                    <ToDoList />
                </ToDoListProvider>
            </Router>
            
        );

        const toDoList = screen.getByTestId('toDoList');
        expect(toDoList).toBeInTheDocument();
        expect(toDoList.firstChild).toBeNull();

        expect(container).toMatchSnapshot();
    });

    it('shows toDo List', () => {
        localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

        render(
            <Router>
                <ToDoListProvider>
                    <ToDoList />
                </ToDoListProvider>
            </Router>
        );

        expect(screen.getByText('ToDo 1')).toBeInTheDocument();
        expect(screen.getByText('ToDo 2')).toBeInTheDocument();
        expect(screen.getByText('ToDo 3')).toBeInTheDocument();
        expect(screen.getAllByText('삭제').length).toBe(3);

        const toDoItem1 = screen.getByText('ToDo 1');
        expect(toDoItem1).toBeInTheDocument();
        expect(toDoItem1.getAttribute('href')).toBe('/detail/0');

        const toDoItem2 = screen.getByText('ToDo 2');
        expect(toDoItem2).toBeInTheDocument();
        expect(toDoItem2.getAttribute('href')).toBe('/detail/1');

        const toDoItem3 = screen.getByText('ToDo 3');
        expect(toDoItem3).toBeInTheDocument();
        expect(toDoItem3.getAttribute('href')).toBe('/detail/2');
    });

    it('deletes toDo item', () => {
        localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

        render(
            <Router>
                <ToDoListProvider>
                    <ToDoList />
                </ToDoListProvider>
            </Router>
        );

        const toDoItem = screen.getByText('ToDo 2');
        expect(toDoItem).toBeInTheDocument();
        fireEvent.click(toDoItem.nextElementSibling as HTMLElement);
        expect(toDoItem).not.toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
    })

    it('moves to detail page', () => {
        const TestComponent = (): JSX.Element => {
            const { pathname } = useLocation();
            return <div>{pathname}</div>;
        };

        localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

        render(
            <Router>
                <TestComponent />
                <ToDoListProvider>
                    <ToDoList />
                </ToDoListProvider>
            </Router>
        )

        const url = screen.getByText('/');
        expect(url).toBeInTheDocument();

        const toDoItem1 = screen.getByText('ToDo 2');
        expect(toDoItem1.getAttribute('href')).toBe('/detail/1');
        fireEvent.click(toDoItem1);

        expect(url.textContent).toBe('/detail/1');

        const toDoItem2 = screen.getByText('ToDo 3');
        expect(toDoItem2).toBeInTheDocument(); // 이게 되는 것으로 보아선, 여기서 Router 는 
        // app.tsx 에서 쓰는 Routes, Route 와 다른 개념이군.
    })

})