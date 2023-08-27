import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
    id: string;
    token: string;
    completed: boolean;
}

// type TodosState = {
//     list: Todo[];
// }

const initialState: Todo = {
    id: "",
    token: "",
    completed: false
}


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            // state.list.push({
            //     id: new Date().toISOString(),
            //     token: action.payload,
            //     completed: false,
            // });

            state.id = new Date().toISOString()
            state.token = action.payload
            state.completed = true
        },
        // addTodo: (state, action: PayloadAction<number>) => {
        //     state.id = new Date().toISOString(),
        //         state.token = action.payload.toString,
        //         state.completed = true
        // },
        toggleComplete(state, action: PayloadAction<string>) {
            //const toggledTodo = state.list.find(todo => todo.id === action.payload);

        },
        removeTodo(state) {
            state.token = ""
            state.completed = false
            state.id = ""
        }
    },
});


export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;