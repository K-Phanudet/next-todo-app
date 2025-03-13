import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodosPage, { Todo } from './page';
import { useTodos } from '../hooks/useTodos';
import { useAuth } from '@/app/hooks/useAuth';


jest.mock('../hooks/useTodos');
jest.mock('@/app/hooks/useAuth');

describe('TodosPage Component Tests', () => {
  let mockTodos: Todo[];
  let mockAddTodo: jest.Mock;
  let mockUpdateTodo: jest.Mock;
  let mockDeleteTodo: jest.Mock;
  let mockLogout: jest.Mock;

  beforeEach(() => {
    mockTodos = [
      { id: '1', title: 'Todo 1', description: 'Description 1' },
      { id: '2', title: 'Todo 2', description: 'Description 2' },
    ];
    mockAddTodo = jest.fn();
    mockUpdateTodo = jest.fn();
    mockDeleteTodo = jest.fn();
    mockLogout = jest.fn();

    (useTodos as jest.Mock).mockReturnValue({
      todos: mockTodos,
      handleAddTodo: mockAddTodo,
      handleUpdateTodo: mockUpdateTodo,
      handleDeleteTodo: mockDeleteTodo,
    });
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });

    mockAddTodo.mockClear();
    mockUpdateTodo.mockClear();
    mockDeleteTodo.mockClear();
    mockLogout.mockClear();
  });

  describe('GIVEN the todos page is rendered', () => {
    describe('WHEN the user interacts with the page', () => {
      it('THEN should display the todo cards and the add button', () => {
        render(<TodosPage />);
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
        expect(screen.getByTestId('primary-header-cta')).toBeInTheDocument();
        expect(screen.getByTestId('secondary-header-cta')).toBeInTheDocument();
      });
    });
  });

  describe('GIVEN the user clicks the add button', () => {
    describe('WHEN the user enters a title and description and clicks create', () => {
      it('THEN should call the addTodo function with the new todo and close the modal', async () => {
        render(<TodosPage />);
        fireEvent.click(screen.getByTestId('primary-header-cta'));

        fireEvent.change(screen.getByTestId('input-title-box'), { target: { value: 'New Todo' } });
        fireEvent.change(screen.getByTestId('input-desc-box'), { target: { value: 'New Description' } });
        fireEvent.click(screen.getByRole('button', { name: 'Create' }));

        await waitFor(() => expect(mockAddTodo).toHaveBeenCalledWith({ title: 'New Todo', description: 'New Description' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('GIVEN the user clicks the edit button on a todo', () => {
    describe('WHEN the user updates the title and description and clicks save', () => {
      it('THEN should call the updateTodo function with the updated todo and close the modal', async () => {
        render(<TodosPage />);
        fireEvent.click(screen.getAllByTestId('edit-todo-button')[0]);

        fireEvent.change(screen.getByTestId('input-title-box'), { target: { value: 'Updated Todo' } });
        fireEvent.change(screen.getByTestId('input-desc-box'), { target: { value: 'Updated Description' } });
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));

        await waitFor(() => expect(mockUpdateTodo).toHaveBeenCalledWith({ id: '1', title: 'Updated Todo', description: 'Updated Description' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('GIVEN the user clicks the delete button on a todo', () => {
    describe('WHEN the user confirms the deletion', () => {
      it('THEN should call the deleteTodo function with the todo id', () => {
        render(<TodosPage />);
        fireEvent.click(screen.getAllByTestId('delete-todo-button')[0]);

        expect(mockDeleteTodo).toHaveBeenCalledWith('1');
      });
    });
  });

  describe('GIVEN the user clicks the logout button', () => {
    describe('WHEN the user confirm the logout', () => {
      it('THEN should call the logout function', () => {
        render(<TodosPage />);
        fireEvent.click(screen.getByTestId('secondary-header-cta'));

        expect(mockLogout).toHaveBeenCalled();
      });
    });
  });

    describe('GIVEN the user tries to create todo without title or description', () => {
      it('THEN should show error message', async () => {
        render(<TodosPage />);
        fireEvent.click(screen.getByTestId('primary-header-cta'));
        fireEvent.click(screen.getByTestId('primary-cta-modal'));

        expect(screen.getByText('Title is required')).toBeInTheDocument();
        expect(screen.getByText('Description is required')).toBeInTheDocument();
      });
    });

    describe('GIVEN the user tries to update todo without title or description', () => {
      it('THEN should show error message', async () => {
        render(<TodosPage />);
        fireEvent.click(screen.getAllByTestId('edit-todo-button')[0]);
        fireEvent.change(screen.getByTestId('input-title-box'), { target: { value: '' } });
        fireEvent.change(screen.getByTestId('input-desc-box'), { target: { value: '' } });
        fireEvent.click(screen.getByTestId('primary-cta-modal'));
        expect(screen.getByText('Title is required')).toBeInTheDocument();
        expect(screen.getByText('Description is required')).toBeInTheDocument();
      });
    });
});