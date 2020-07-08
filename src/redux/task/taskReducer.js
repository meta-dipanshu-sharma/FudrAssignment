import { CREATE_TASK, DELETE_TASK } from './taskTypes'

const initialState = {
    tasks: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK: return {
            ...state,
            tasks: [...state.tasks, action.payload]
        }

        case DELETE_TASK: return {
            tasks: [...state.tasks.filter(task => task !== action.payload)]
        }

        default: return state
    }
}

export default taskReducer