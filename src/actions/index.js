import * as types from '../constants/ActionTypes'

export const addTodo = text => ({type: types.ADD_TODO, text});
export const deleteTodo = id => ({type: types.DELETE_TODO, id});
export const editTodo = (id, text) => ({type: types.EDIT_TODO, id, text});
export const completeTodo = id => ({type: types.COMPLETE_TODO, id});
export const completeAllTodos = () => ({type: types.COMPLETE_ALL_TODOS});
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED});
export const setVisibilityFilter = filter => ({type: types.SET_VISIBILITY_FILTER, filter});

export const localToRedux = (
    storeTodos = []
) =>
    ({
        type: types.LOCAL_TO_REDUX,
        storeTodos
    });

export const updateOrder = (
    todos = []
) =>
    ({
        type: types.CHANGE_ORDER_OF_REDUX_ITEMS,
        todos
    });

export const addComment = (
    {
      id = 0,
      comment = ''
    } = {}
)=>({
    type: types.ADD_COMMENT,
    id,
    comment
});

export const changeStatus = (
    {
        id = 0,
        status = false
    } = {}
) => ({
    type: types.CHANGE_CB_STATUS,
    id,
    status
})
