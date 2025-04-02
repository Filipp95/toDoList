import { IsTaskList } from '@/components/types/tasktypes'

import { Button } from '@chakra-ui/react'

import TaskCheckboxElement from '@/components/widget/TaskCheckboxElement/TaskCheckboxElement'

import s from './TasksList.module.scss'

interface TasksListProps {
    tasksForToDoList: IsTaskList[],
    activeTaskQuantity: number | string,
    handleEditTask: (id: number, newText: string) => void,
    handleDeleteTask: (id: number) => void,
    handleCompleteTask: (id: number, newStatus: boolean) => void,
    handleClearCompletedList: () => void
}

const TasksList = ({ tasksForToDoList, activeTaskQuantity, handleEditTask, handleDeleteTask, handleCompleteTask, handleClearCompletedList }: TasksListProps) => {

    const handleDeleteButtonClick = () => {
        handleClearCompletedList()
    }

    return (
        <div className={tasksForToDoList.length ? s.task_list_container : s.task_list_container_hided}>
            <div className={s.tasks}>
                {tasksForToDoList.map((task) => {
                    return (
                        <div key={task.id}>
                            <TaskCheckboxElement id={task.id} complete={task.complete} handleEditTask={handleEditTask}
                                handleDeleteTask={handleDeleteTask} handleCompleteTask={handleCompleteTask}>
                                {task.note ? task.note : ""}
                            </TaskCheckboxElement>
                        </div>
                    )
                }
                )}
            </div>
            <div className={s.active_tasks_text}>Количество активных задач: {activeTaskQuantity}</div>
            <Button size="lg" colorPalette="gray" variant="outline" className={s.clear_completed_tasks_button}
                onClick={handleDeleteButtonClick}>
                Очистить выполненные задачи
            </Button>
        </div>
    )
}

export default TasksList