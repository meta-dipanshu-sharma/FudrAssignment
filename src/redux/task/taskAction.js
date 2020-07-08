import { CREATE_TASK, DELETE_TASK } from './taskTypes'

const createTask = (data) => {
    return {
        type: CREATE_TASK,
        payload: data
    }
}

const deleteTask = (data) => {
    return {
        type: DELETE_TASK,
        payload: data
    }
}

export { createTask, deleteTask }