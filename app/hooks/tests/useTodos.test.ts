import { renderHook, act, waitFor } from '@testing-library/react';
import { useTodos } from '../useTodos';
import { fetchTodos, createTodo, updateTodo as updateTodoHandler, deleteTodo as deleteTodoHandler } from '@/app/lib/api/todo';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setTodos, addTodo, updateTodo, deleteTodo } from '@/app/slices/todoSlice';



jest.mock('../hooks');
jest.mock('@/app/slices/todoSlice');
jest.mock('@/app/lib/api/todo', () => ({
  fetchTodos: jest.fn(),
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}))

describe('useTodos Hook Tests', () => {
  let mockDispatch: jest.Mock;
  let mockSelector: jest.Mock;
  let mockFetchTodos: jest.Mock;
  let mockCreateTodo: jest.Mock;
  let mockUpdateTodo: jest.Mock;
  let mockDeleteTodo: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockSelector = jest.fn();
    mockFetchTodos = fetchTodos as jest.Mock;
    mockCreateTodo = createTodo as jest.Mock;
    mockUpdateTodo = updateTodoHandler as jest.Mock;
    mockDeleteTodo = deleteTodoHandler as jest.Mock;

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockImplementation((params) => mockSelector(params));

    mockFetchTodos.mockClear();
    mockCreateTodo.mockClear();
    mockUpdateTodo.mockClear();
    mockDeleteTodo.mockClear();
    mockDispatch.mockClear();
    mockSelector.mockClear();

    mockFetchTodos.mockResolvedValue({data:[]})
  });

  it('should return todos, handleAddTodo, handleUpdateTodo, and handleDeleteTodo', () => {
    mockSelector.mockReturnValue([]);

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos).toEqual([]);
    expect(result.current.handleAddTodo).toBeDefined();
    expect(result.current.handleUpdateTodo).toBeDefined();
    expect(result.current.handleDeleteTodo).toBeDefined();
  });

  describe('useEffect hook', () => {
    it('should fetch todos and dispatch setTodos on mount', async () => {
      const mockTodos = [{ id: '1', title: 'Todo 1', description: 'Description 1' }];
      mockFetchTodos.mockResolvedValue({ data: mockTodos });

      renderHook(() => useTodos());

      await waitFor(() => expect(mockFetchTodos).toHaveBeenCalled());
      expect(mockDispatch).toHaveBeenCalledWith(setTodos(mockTodos));
    });
  });

  describe('handleAddTodo function', () => {
    it('should create a todo and dispatch addTodo', async () => {
      const todo = { title: 'New Todo', description: 'New Description' };
      const newTodo = { id: '2', ...todo };
      mockCreateTodo.mockResolvedValue(newTodo);

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.handleAddTodo(todo);
      });

      expect(mockCreateTodo).toHaveBeenCalledWith(todo);
      expect(mockDispatch).toHaveBeenCalledWith(addTodo(newTodo));
    });
  });

  describe('handleUpdateTodo function', () => {
    it('should update a todo and dispatch updateTodo', async () => {
      const todo = { id: '1', title: 'Updated Todo', description: 'Updated Description' };

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.handleUpdateTodo(todo);
      });

      expect(mockUpdateTodo).toHaveBeenCalledWith(todo);
      expect(mockDispatch).toHaveBeenCalledWith(updateTodo(todo));
    });
  });

  describe('handleDeleteTodo function', () => {
    it('should delete a todo and dispatch deleteTodo', async () => {
      const id = '1';

      const { result } = renderHook(() => useTodos());

      await act(async () => {
        await result.current.handleDeleteTodo(id);
      });

      expect(mockDeleteTodo).toHaveBeenCalledWith(id);
      expect(mockDispatch).toHaveBeenCalledWith(deleteTodo(id));
    });
  });
});