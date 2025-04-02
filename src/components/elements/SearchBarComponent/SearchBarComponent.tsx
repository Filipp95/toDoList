import { Input } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

import s from './SearchBarComponent.module.scss'

const SearchBarComponent = () => {
    return (
        <div className={s.search_bar_container}>
            <Input placeholder='Найти задачу' variant="flushed" />
            <IconButton aria-label="Search database">
                <LuSearch />
            </IconButton>
        </div>
    )
}

export default SearchBarComponent