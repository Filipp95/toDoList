import { Field, NativeSelect } from "@chakra-ui/react"

import { StatusTaskType } from "@/components/types/tasktypes"

import s from './FilterTasksButton.module.scss'

interface FilterTasksButtonProps {
  handleFilterList: (status: StatusTaskType) => void,
  filterStatus: StatusTaskType,
}

const FilterTasksButton = ({handleFilterList, filterStatus}:FilterTasksButtonProps) => {

   const handleChooseStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterList(e.target.value as StatusTaskType)
  }

  return (
    <Field.Root className={s.filter_task_button}>
      <NativeSelect.Root >
        <NativeSelect.Field defaultValue={filterStatus} onChange={handleChooseStatus}>
          <option value="all">Все задачи</option>
          <option value="active">Активные</option>
          <option value="completed">Завершенные</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

export default FilterTasksButton
