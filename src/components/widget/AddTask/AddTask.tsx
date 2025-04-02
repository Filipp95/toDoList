import { useRef } from "react"

import { IsTaskList } from "@/components/types/tasktypes"

import { Button } from "@chakra-ui/react"

import s from './AddTask.module.scss'


interface AddTaskProps {
    saveToLS: (isTaskList:IsTaskList[]) => void,
    isNewTaskWindowOpen?: boolean,
    setNewTaskWindowOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTasksList: React.Dispatch<React.SetStateAction<IsTaskList[]>>,
    isTaskList: Array<object>,
}

const AddTask = ({saveToLS, isNewTaskWindowOpen, setNewTaskWindowOpen, setTasksList, isTaskList }: AddTaskProps) => {
    const taskRef = useRef<HTMLInputElement | null>(null)

    const handleAddTask = (e: React.FormEvent)  => {
        e.preventDefault();
        if (!taskRef.current || !taskRef.current.value.trim()) return;
        const newTask: IsTaskList  = {
            id: Date.now(),
            complete: false,
            note: taskRef.current?.value,
        }
        const updateNewAddedTask = [...isTaskList, newTask];
        setTasksList(updateNewAddedTask);
        saveToLS(updateNewAddedTask);

        taskRef.current.value = '';
        setNewTaskWindowOpen(false)
    }

    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        setNewTaskWindowOpen(false)
    }

    return (
        <div className={isNewTaskWindowOpen ? s.add_task_container : s.add_task_container_hided}>
            <form className={s.add_task_form_wrapper} onSubmit={handleAddTask}>
                <div className={s.add_task_text}>НОВАЯ ЗАМЕТКА</div>
                <input ref={taskRef} className={s.add_task_input_field} type='text' name="task" placeholder="Введите задачу или заметку..." required />
                <div className={s.add_task_buttons}>
                    <Button colorPalette="gray" size="xl" variant="outline" className={s.cancel_new_task_button} onClick={handleCancel}>Отмена</Button>
                    <Button type='submit' colorPalette="gray" size="xl" variant="solid" className={s.apply_new_task_button}>Добавить</Button>
                </div>
            </form>
        </div>
    )
}

export default AddTask