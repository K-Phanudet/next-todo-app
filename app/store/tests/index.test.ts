import store, { RootState, AppDispatch } from '../';
import todoReducer, { setTodos } from '../../slices/todoSlice';

describe('Redux Store Configuration Tests', () => {
  it('should configure the store with the todoReducer', () => {
    const state = store.getState();
    expect(state.todos).toEqual(todoReducer(undefined, { type: 'unknown' }));
  });

  it('should have the correct RootState type', () => {
    const state = store.getState();
    const rootState: RootState = state; 
    expect(rootState).toBeDefined();
  });

  it('should have the correct AppDispatch type', () => {
    const dispatch = store.dispatch;
    const appDispatch: AppDispatch = dispatch; 
    expect(appDispatch).toBeDefined();
  });

  it('should dispatch actions and update the state', () => {
    const todos = [
      { id: '1', title: 'Todo 1', description: 'Description 1' },
      { id: '2', title: 'Todo 2', description: 'Description 2' },
    ];

    store.dispatch(setTodos(todos));
    const state = store.getState();
    expect(state.todos.todos).toEqual(todos);
  });
});