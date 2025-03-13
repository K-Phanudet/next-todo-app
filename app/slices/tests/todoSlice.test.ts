import todoReducer, { setTodos, addTodo, updateTodo, deleteTodo } from '../todoSlice';

describe('Todo Redux Slice Tests', () => {
  const initialState = {
    todos: [],
  };

  it('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setTodos reducer', () => {
    describe('GIVEN an array of todos', () => {
      describe('WHEN setTodos is called', () => {
        it('THEN should update the todos state with the provided array', () => {
          const todos = [
            { id: '1', title: 'Todo 1', description: 'Description 1' },
            { id: '2', title: 'Todo 2', description: 'Description 2' },
          ];
          const nextState = todoReducer(initialState, setTodos(todos));
          expect(nextState.todos).toEqual(todos);
        });
      });
    });
  });

  describe('addTodo reducer', () => {
    describe('GIVEN a new todo object', () => {
      describe('WHEN addTodo is called', () => {
        it('THEN should add the todo to the todos state', () => {
          const newTodo = { id: '3', title: 'Todo 3', description: 'Description 3' };
          const nextState = todoReducer(initialState, addTodo(newTodo));
          expect(nextState.todos).toEqual([newTodo]);
        });

        it('THEN should append the todo to the existing todos', () => {
          const existingTodo = { id: '1', title: 'Todo 1', description: 'Description 1' };
          const stateWithExisting = { todos: [existingTodo] };
          const newTodo = { id: '2', title: 'Todo 2', description: 'Description 2' };
          const nextState = todoReducer(stateWithExisting, addTodo(newTodo));
          expect(nextState.todos).toEqual([existingTodo, newTodo]);
        });
      });
    });
  });

  describe('updateTodo reducer', () => {
    describe('GIVEN an existing todo and an update payload', () => {
      describe('WHEN updateTodo is called', () => {
        it('THEN should update the todo with the provided payload', () => {
          const existingTodo = { id: '1', title: 'Todo 1', description: 'Description 1' };
          const initialStateWithTodo = { todos: [existingTodo] };
          const updatePayload = { id: '1', title: 'Updated Todo', description: 'Updated Description' };
          const nextState = todoReducer(initialStateWithTodo, updateTodo(updatePayload));
          expect(nextState.todos).toEqual([{ id: '1', title: 'Updated Todo', description: 'Updated Description' }]);
        });

        it('THEN should update only the title if only the title is provided', () => {
          const existingTodo = { id: '1', title: 'Todo 1', description: 'Description 1' };
          const initialStateWithTodo = { todos: [existingTodo] };
          const updatePayload = { id: '1', title: 'Updated Title' };
          const nextState = todoReducer(initialStateWithTodo, updateTodo(updatePayload));
          expect(nextState.todos).toEqual([{ id: '1', title: 'Updated Title', description: 'Description 1' }]);
        });

        it('THEN should update only the description if only the description is provided', () => {
            const existingTodo = { id: '1', title: 'Todo 1', description: 'Description 1' };
            const initialStateWithTodo = { todos: [existingTodo] };
            const updatePayload = { id: '1', description: 'Updated Description' };
            const nextState = todoReducer(initialStateWithTodo, updateTodo(updatePayload));
            expect(nextState.todos).toEqual([{ id: '1', title: 'Todo 1', description: 'Updated Description' }]);
        });

        it('THEN should not modify state if todo not found', () => {
          const existingTodo = { id: '1', title: 'Todo 1', description: 'Description 1' };
          const initialStateWithTodo = { todos: [existingTodo] };
          const updatePayload = { id: '2', title: 'Updated Todo', description: 'Updated Description' };
          const nextState = todoReducer(initialStateWithTodo, updateTodo(updatePayload));
          expect(nextState.todos).toEqual([existingTodo]);
        });
      });
    });
  });

  describe('deleteTodo reducer', () => {
    describe('GIVEN an existing todo and a todo ID', () => {
      describe('WHEN deleteTodo is called', () => {
        it('THEN should remove the todo with the provided ID from the todos state', () => {
          const existingTodos = [
            { id: '1', title: 'Todo 1', description: 'Description 1' },
            { id: '2', title: 'Todo 2', description: 'Description 2' },
          ];
          const initialStateWithTodos = { todos: existingTodos };
          const nextState = todoReducer(initialStateWithTodos, deleteTodo('1'));
          expect(nextState.todos).toEqual([{ id: '2', title: 'Todo 2', description: 'Description 2' }]);
        });

        it('THEN should not modify state if todo not found', () => {
            const existingTodos = [
              { id: '1', title: 'Todo 1', description: 'Description 1' },
              { id: '2', title: 'Todo 2', description: 'Description 2' },
            ];
            const initialStateWithTodos = { todos: existingTodos };
            const nextState = todoReducer(initialStateWithTodos, deleteTodo('3'));
            expect(nextState.todos).toEqual(existingTodos);
          });
      });
    });
  });
});