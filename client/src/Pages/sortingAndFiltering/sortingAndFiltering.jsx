import { useState } from "react"
import DataManagement from "../DataManagement"

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
        <><div>
        <div>
          <input type="search" name="searchProduct " value={queries.name} onChange={(event) => handleOnChangeSearchBar(event)} placeholder="Busca tu producto" />
        </div>
      </div>
      <DataManagement
        name= {queries.name}
      />
      </>
      
    )

}