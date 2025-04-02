import EmptyList from "@/components/widget/EmptyList/EmptyList";
import TasksList from "@/components/widget/TasksList/TasksList";
import { IsTaskList } from "@/components/types/tasktypes";

interface TaskSectionProps {
    tasksForToDoList: IsTaskList[],
    activeTaskQuantity: number | string,
    handleEditTask: (id: number, newText: string) => void,
    handleDeleteTask: (id: number) => void,
    handleCompleteTask: (id: number, newStatus: boolean) => void,
    handleClearCompletedList: () => void,
}

const TaskSection = ({tasksForToDoList, activeTaskQuantity, handleEditTask, handleDeleteTask, handleCompleteTask, handleClearCompletedList}: TaskSectionProps) => {
    return (
        <div>
            <EmptyList tasksForToDoList={tasksForToDoList}/>
            <TasksList tasksForToDoList={tasksForToDoList} activeTaskQuantity={activeTaskQuantity} handleEditTask={handleEditTask} 
            handleDeleteTask={handleDeleteTask} handleCompleteTask={handleCompleteTask} handleClearCompletedList={handleClearCompletedList}/>
        </div>
    )
}

export default TaskSection