import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { ToDoItem } from './index';

describe('<ToDoItem />', () => {
    
    it('renders component correctly', () => {
        const { container } = render(
            <Router>
                <ToDoItem id={1} label="default value" />
            </Router>, // 여기서 [,] 는 어떤 의미지?
        );

        const todoItem = screen.getByText('default value');
        expect(todoItem).toBeInTheDocument();
        expect(todoItem.getAttribute('href')).toBe('/detail/1');
    });

    it('clicks the delete button', () => {
        const handleClick = jest.fn(); // Mocking functions
        render(
            <Router>
                <ToDoItem id={1} label="default value" onDelete={handleClick} />
            </Router>
        );

        const deleteButton = screen.getByText('삭제');
        expect(handleClick).toHaveBeenCalledTimes(0);
        fireEvent.click(deleteButton);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('clicks the link', () => {
        const TestComponent = (): JSX.Element => {
            const { pathname } = useLocation();
            return (
                <div>
                    <div>{pathname}</div>
                    <ToDoItem id={1} label="default value" />
                </div>
            );
        };

        render(
            <Router>
                <TestComponent />
            </Router>,
        );
        
        const pathName = screen.getByText('/');
        expect(pathName).toBeInTheDocument();
        const todoItem = screen.getByText('default value');
        fireEvent.click(todoItem); // route 가 변경되는 것은 sync 동작이다!
        expect(pathName.textContent).toBe('/detail/1');
    })

});