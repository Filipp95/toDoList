import { Checkbox } from "@chakra-ui/react";

import { useState, useRef, useEffect } from 'react';

import s from './TaskCheckboxElement.module.scss';

import edit_is_active from '@/assets/images/tasksList/edit_active.svg'
import edit_is_inActive from '@/assets/images/tasksList/edit_inActive.svg'
import delete_is_active from '@/assets/images/tasksList/delete_active.svg'
import delete_is_inActive from '@/assets/images/tasksList/delete_inActive.svg'

interface TaskCheckboxElementProps {
  id: number,
  complete: boolean,
  children: string,
  handleEditTask: (id: number, newText: string) => void,
  handleDeleteTask: (id: number) => void,
  handleCompleteTask: (id: number, newStatus: boolean) => void,
}

const TaskCheckboxElement = ({ id, complete, children, handleEditTask, handleDeleteTask, handleCompleteTask }: TaskCheckboxElementProps) => {
  const [isEditHover, setIsEditHover] = useState<boolean>(false);
  const [isDeleteHover, setIsDeleteHover] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const newTextRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && newTextRef.current) {
      newTextRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveEditText = () => {
    setIsEditing(false)
    console.log("saved")
    let newText:string;
    if (newTextRef.current?.value){
      newText = newTextRef.current?.value 
      handleEditTask(id, newText)
    }
  }

  const handleDeleteClick = () => {
    handleDeleteTask(id)
  }

  const handleCheckChange = () =>{
      handleCompleteTask(id, !complete)
  }

  const handleActiveEditHover = () => {
    setIsEditHover(true)
  }
  const handleInActiveEditHover = () => {
    setIsEditHover(false)
  }
  const handleActiveDeleteHover = () => {
    setIsDeleteHover(true)
  }
  const handleInActiveDeleteHover = () => {
    setIsDeleteHover(false)
  }

  return (
    <div className={s.task_container}>
      <Checkbox.Root checked={complete} onChange={handleCheckChange}>
        <Checkbox.HiddenInput />
        <Checkbox.Control className={s.task_box}/>
        {isEditing ?
          <form className={s.add_task_form_wrapper} onBlur={handleSaveEditText}>
            <input ref={newTextRef} className={s.edit_task_text} type='text' name="task" defaultValue={children} 
            onChange={(e)=>e.stopPropagation()} onInput={(e)=>e.stopPropagation()} />
          </form>
          : <Checkbox.Label className={complete ? s.task_text_crossed : s.task_text} >{children}</Checkbox.Label>}
      </Checkbox.Root>
      <div onClick={handleEditClick} onPointerEnter={handleActiveEditHover} onPointerLeave={handleInActiveEditHover}>
        {isEditHover ? <img src={edit_is_active} alt='Нажмите для завершения редактирования' /> :
          <img src={edit_is_inActive} alt='Нажмите для редактирования' />}
      </div>
      <div onClick={handleDeleteClick} onPointerEnter={handleActiveDeleteHover} onPointerLeave={handleInActiveDeleteHover}>
        {isDeleteHover ? <img src={delete_is_active} alt='Нажмите, чтобы удалить задачу' /> :
          <img src={delete_is_inActive} alt='Нажмите, чтобы удалить задачу' />}
      </div>
    </div>
  )
}

export default TaskCheckboxElement





