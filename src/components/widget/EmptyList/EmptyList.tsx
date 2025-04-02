import ImageComponent from "@/components/elements/ImageComponent/ImageComponent"

import emptyPng from "@/assets/images/emptylist/empty_list_image.png"
import emptyWebp from "@/assets/images/emptylist/empty_list_image.webp"

import s from "./EmptyList.module.scss"

type EmptyListProps = {
    tasksForToDoList: Array<object>,
}

const EmptyList = ({tasksForToDoList}:EmptyListProps) => {
    return (
        <div className = {tasksForToDoList.length ? s.empty_list_container_hided : s.empty_list_container}>
            <ImageComponent sourceWebp={emptyWebp} sourcePng={emptyPng} 
            description={'Список задач пуст'} className={s.empty_list_image}/>
            <div className={s.empty_list_text}>Список задач пуст...</div>
        </div>
    )
}

export default EmptyList