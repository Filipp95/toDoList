export interface IsTaskList {
    id: number,
    complete: boolean
    note: string | undefined, 
}

export type StatusTaskType = "all" | "active" | "completed" | string 