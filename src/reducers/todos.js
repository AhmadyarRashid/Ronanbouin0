import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL_TODOS,
    CLEAR_COMPLETED,
    LOCAL_TO_REDUX,
    ADD_COMMENT,
    CHANGE_ORDER_OF_REDUX_ITEMS,
    CHANGE_CB_STATUS
} from '../constants/ActionTypes'

const initialState = [
    // {
    //     text: 'Use Redux',
    //     completed: false,
    //     id: 0,
    //     status: false,
    //     comments: []
    // }
];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:

            const newState = [
                ...state,
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text,
                    status: false,
                    comments: []
                }
            ];

            localStorage.setItem('TodoList', JSON.stringify(newState));
            return newState;

        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.id
            );

        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    {...todo, text: action.text} :
                    todo
            );

        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    {...todo, completed: !todo.completed} :
                    todo
            )

        case COMPLETE_ALL_TODOS:
            const areAllMarked = state.every(todo => todo.completed)
            return state.map(todo => ({
                ...todo,
                completed: !areAllMarked
            }));

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false);

        case LOCAL_TO_REDUX:
            if (action.storeTodos) {
                return action.storeTodos;
            } else {
                return [
                    ...state
                ]
            }
        case ADD_COMMENT:
            let temp = state;
            temp.forEach(i => {
                if (i.id == action.id) {
                    i.comments.push(action.comment)
                }
            });
            localStorage.setItem("TodoList", JSON.stringify(temp));
            return temp;

        case CHANGE_ORDER_OF_REDUX_ITEMS:
            if (action.todos) {
              //  console.log('UO', action.todos);
                localStorage.setItem("TodoList", JSON.stringify(action.todos));
                return action.todos;
            } else {
                return [
                    ...state
                ]
            }
        case CHANGE_CB_STATUS:
            let cbTemp = state;
            cbTemp.forEach(i => {
                if (i.id == action.id) {
                    i.status = action.status
                }
            });
            localStorage.setItem("TodoList", JSON.stringify(cbTemp));
            return cbTemp;
        default:
            return state
    }
}
