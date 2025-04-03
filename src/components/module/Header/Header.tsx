import ImageComponent from "@/components/elements/ImageComponent/ImageComponent";
import FilterTasksButton from "@/components/elements/FilterTasksButton/FilterTasksButton";

import { IsTaskList } from "@/components/types/tasktypes";

import { useRef, useState } from "react";

import { StatusTaskType } from "@/components/types/tasktypes";

import { Button } from "@chakra-ui/react";

import s from "./Header.module.scss";

import logo_webp from "@/assets/images/header/logo_image.webp";
import logo_png from "@/assets/images/header/logo_image.png";

interface HeaderProps {
    isTaskList: IsTaskList[],
    filterStatus: StatusTaskType,
    handleFilterList: (status: StatusTaskType) => void,
    saveToLS: (tasks: IsTaskList[]) => void,
    setTasksList: (tasks: IsTaskList[]) => void,
    setActiveTaskQuantity: (newQuantity: number) => void,
    saveActiveTasksToLS:(newQuantity: number)=> void,
}

const Header = ({ isTaskList, filterStatus, handleFilterList, saveToLS, setTasksList, setActiveTaskQuantity, saveActiveTasksToLS}: HeaderProps) => {
    const taskRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<number | string>()

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskRef.current || !taskRef.current.value.trim()) return;
        const newTask: IsTaskList = {
            id: Date.now(),
            complete: false,
            note: taskRef.current?.value,
        }
        const updateNewAddedTask = [...isTaskList, newTask];
        const newQuantity = updateNewAddedTask.filter((task)=>task.complete===false).length
        setActiveTaskQuantity(newQuantity)
        saveActiveTasksToLS(newQuantity)

        setTasksList(updateNewAddedTask);
        saveToLS(updateNewAddedTask);
        taskRef.current.value = '';
    }

    return (
        <div className={s.header_container}>
            <div>
                <ImageComponent sourceWebp={logo_webp} sourcePng={logo_png}
                    description={'Логотип сайта'} className={s.header_logo_image} />
            </div>
            <div className={s.header_tasks_controls}>
                <form className={s.add_task_form_wrapper} onSubmit={handleAddTask}>
                    <input ref={taskRef} className={s.add_task_input_field} value={inputValue} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setInputValue(e.target.value)} type='text' name="task"
                     placeholder="Введите задачу или заметку..." required />
                    <div className={s.add_task_buttons}>
                        <Button type='submit' colorPalette="gray" size="xl" variant="solid" className={s.apply_new_task_button}>Добавить</Button>
                    </div>
                </form>
                <FilterTasksButton handleFilterList={handleFilterList} filterStatus={filterStatus} />
            </div>
        </div>
    )
}

export default Header 