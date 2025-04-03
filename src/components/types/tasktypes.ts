export interface IsTaskList {
    id: number,
    complete: boolean
    note: string | undefined, 
}

export enum StatusTaskType {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed"
}