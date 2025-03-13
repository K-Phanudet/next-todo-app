import { fetchTodos, updateTodo, createTodo, deleteTodo } from '../todo';

describe('Todo API Function Tests', () => {
  describe('fetchTodos function', () => {
    let fetchMock = jest.fn()

    beforeEach(() => {
      global.fetch = fetchMock
      fetchMock.mockClear();
    });

    afterEach(() => {
      fetchMock.mockRestore();
    });

    describe('GIVEN the API returns a successful response with todos', () => {
      describe('WHEN fetchTodos is called', () => {
        it('THEN should not throw', async () => {
          fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => ({ isSuccess: true, data: [] }),
            status: 200,
          })

          await expect(() => fetchTodos()).not.toThrow()
        });
      });
    });

    describe('GIVEN the API returns an error response', () => {
      describe('WHEN fetchTodos is called', () => {
        it('THEN should throw an error', async () => {
          fetchMock.mockResolvedValueOnce({
            ok: false,
            json: () => ({ isSuccess: false, data: [] }),
            status: 200,
          })

          await expect(() => fetchTodos()).rejects.toThrow();
        });
      });
    });
  });

  describe('updateTodo function', () => {
    let fetchMock = jest.fn()

    beforeEach(() => {
      global.fetch = fetchMock
      fetchMock.mockClear();
    });

    afterEach(() => {
      fetchMock.mockRestore();
    });

    describe('GIVEN a todo update payload', () => {
      describe('WHEN updateTodo is called', () => {
        it('THEN should make a PATCH request to the correct URL with the payload', async () => {
          const todoUpdatePayload = { id: '1', title: 'Updated Todo' };
          fetchMock.mockResolvedValueOnce({})
          await updateTodo(todoUpdatePayload);

          expect(fetchMock).toHaveBeenCalledWith('/api/todos/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todoUpdatePayload),
          });
        });
      });
    });
  });

  describe('createTodo function', () => {
    let fetchMock = jest.fn()

    beforeEach(() => {
      global.fetch = fetchMock
      fetchMock.mockClear();
    });

    afterEach(() => {
      fetchMock.mockRestore();
    });

    describe('GIVEN a new todo payload', () => {
      describe('WHEN createTodo is called', () => {
        it('THEN should make a POST request to the correct URL with the payload', async () => {
          const newTodoPayload = { title: 'New Todo', description: 'New Description' };
         
          fetchMock.mockResolvedValueOnce({
            json: ()=>({data:{}})
          })


          await createTodo(newTodoPayload);

          expect(fetchMock).toHaveBeenCalledWith('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodoPayload),
          });
        });
      });
    });
  });

  describe('deleteTodo function', () => {
    let fetchMock = jest.fn()

    beforeEach(() => {
      global.fetch = fetchMock
      fetchMock.mockClear();
    });

    afterEach(() => {
      fetchMock.mockRestore();
    });

    describe('GIVEN a todo ID', () => {
      describe('WHEN deleteTodo is called', () => {
        it('THEN should make a DELETE request to the correct URL', async () => {
          const todoId = '1';
          fetchMock.mockResolvedValueOnce({});

          await deleteTodo(todoId);

          expect(fetchMock).toHaveBeenCalledWith('/api/todos/1', { method: 'DELETE' });
        });
      });
    });
  });
});