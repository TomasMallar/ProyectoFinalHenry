import { useState } from "react"

export default function SortingAndFiltering (){
    const [queries, setQueries] = useState({
        name: "",
        category: "",
        type: "",
        orderBy: "",
        orderDirection:"",
        page: 1
    })

    const handleOnChangeSearchBar = (event) => {
        event.preventDefault()
        setQueries({ ...queries, name: event.target.value, page: 1 })
    }
    return (
        <div>
        <div>
          <input type="search" name="searchProduct " value={queries.name} onChange= {handleOnChangeSearchBar} placeholder="Busca tu producto" />
        </div>
      </div>
    )

}