import Header from "@/components/module/Header/Header";
import TaskSection from "@/components/module/TaskSection/TaskSection";

import { IsTaskList, StatusTaskType } from "@/components/types/tasktypes";

import { useState, useEffect } from "react";

const ToDoList = () => {
    const [isTaskList, setTasksList] = useState<IsTaskList[]>([]);
    const [filterStatus, setFilterStatus] = useState<StatusTaskType>(localStorage.getItem("filterStatus") || "all");
    const [filteredTasksList, setFilteredTasksList] = useState<IsTaskList[]>([]);
    const [activeTaskQuantity, setActiveTaskQuantity] = useState<number | string>('0');

    useEffect(() => {
        loadFromLs()
    }, [])

    useEffect(() => {
        handleFilterList(filterStatus);
    }, [isTaskList, filterStatus]);

    const saveToLS = (isTaskList: IsTaskList[]) => {
        localStorage.setItem("toDos", JSON.stringify(isTaskList))
    }

    const saveActiveTasksToLS = (newQuantity: number | string) => {
        localStorage.setItem("activeTaskQuantity", JSON.stringify(newQuantity))
    }

    const loadFromLs = () => {
        const isSaved = localStorage.getItem("toDos")
        const savedFilterStatus = localStorage.getItem("filterStatus") || "all";
        const savedActiveTask = localStorage.getItem("activeTaskQuantity") || '0';
        if (isSaved) {
            try {
                const taskList = JSON.parse(isSaved)
                setTasksList(taskList)
            } catch (e) {
                console.error("Ошибка в загрузке сохраненных записей", e);
            }
        }
        setFilterStatus(savedFilterStatus);
        setActiveTaskQuantity(savedActiveTask)
    }

    let updatedFilteredTasks: IsTaskList[];

    const handleFilterList = (status: StatusTaskType) => {
        setFilterStatus(status);
        localStorage.setItem("filterStatus", status);
        if (status === "all") {
            updatedFilteredTasks = isTaskList;
        }
        else if (status === 'active') {
            updatedFilteredTasks = isTaskList.filter((task) => task.complete === false)
        }
        else if (status === 'completed') {
            updatedFilteredTasks = isTaskList.filter((task) => task.complete === true)
        }
        setFilteredTasksList(updatedFilteredTasks)
    }

    const handleEditTask = (id: number, newText: string) => {
        const updateEditTask = isTaskList.map((task) => {
            return (task.id) === id ? { ...task, note: newText } : task
        })
        setTasksList(updateEditTask)
        saveToLS(updateEditTask)
    }

    const handleDeleteTask = (id: number) => {
        const updateDeleteTask = isTaskList.filter((task) => task.id !== id)
        const newQuantity = updateDeleteTask.filter((task)=>task.complete===false).length

        setActiveTaskQuantity(newQuantity)
        saveActiveTasksToLS(newQuantity)
        setTasksList(updateDeleteTask)
        saveToLS(updateDeleteTask)
    }

    const handleCompleteTask = (id: number, newStatus: boolean) => {
        setTasksList((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === id ? { ...task, complete: newStatus } : task
            );
           const newQuantity = updatedTasks.filter((task)=>task.complete===false).length
           setActiveTaskQuantity(newQuantity)
           saveActiveTasksToLS(newQuantity)
           saveToLS(updatedTasks)
           return updatedTasks;
        });
    };

    const handleClearCompletedList = () => {
        const clearedList = isTaskList.filter((task) => task.complete === false)
        setTasksList(clearedList)
        saveToLS(clearedList)
    }

    return (
        <div>
            <Header isTaskList={isTaskList} filterStatus={filterStatus} handleFilterList={handleFilterList} saveToLS={saveToLS} setTasksList={setTasksList}
            setActiveTaskQuantity={setActiveTaskQuantity} saveActiveTasksToLS={saveActiveTasksToLS}/>
            <TaskSection tasksForToDoList={filteredTasksList} activeTaskQuantity={activeTaskQuantity} handleEditTask={handleEditTask}
             handleDeleteTask={handleDeleteTask} handleCompleteTask={handleCompleteTask} handleClearCompletedList={handleClearCompletedList} />
        </div>
    )
}

export default ToDoList