export interface TodosInterface {
    id: number,
    user_id: number,
    title: string,
    due_on: string,
    status: string
}

export enum TodosErrorMessage {
    LESS_THAN_REQUIRED_TODOS = 'The count of todos less than required',
    NO_TODOS = 'There are no todos'
}