import { useState } from "react"
import DataManagement from "../DataManagement"
import styles from "./sortingAndFiltering"

export default function SortingAndFiltering (){
    const [queries, setQueries] = useState({
        name: "",
        category: "",
        type: "",
        sort: "",
        sortDirection:"",
        page: 1
    })

    const handleOnChangeSearchBar = (event) => {
        event.preventDefault()
        setQueries({ ...queries, name: event.target.value, page: 1 })
    }
//------------------------------Sorting----------------------------------------------------
function SortName(event) {
  const results = event.target.value
  let aux= results.split(",")
  setQueries({...queries, sort:aux[0], sortDirection:aux[1]})
}

    return (
        <><div>
        <div>
          <input type="search" name="searchProduct " value={queries.name} onChange={(event) => handleOnChangeSearchBar(event)} placeholder="Busca tu producto" />
        </div>
        <select id="Sort" onChange={SortName} className={styles.dropdown}>
                    <option hidden defaultValue="">Select a sorting Option</option>
                    <optgroup label="id">
                    <option value="id, ASC" >Ascending</option>
                    <option value="id, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="nombre">
                    <option value="nombre, ASC" >Ascending</option>
                    <option value="nombre, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="precio">
                    <option value="precio, ASC">Lowest to Highest (1-5)</option>
                    <option value="precio, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <optgroup label="score">
                    <option value="score, ASC">Lowest to Highest (1-5)</option>
                    <option value="score, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <option value="">Remove sort</option>
                </select>
      </div>
      <DataManagement
        name= {queries.name}
        category= {queries.category}
        type= {queries.type}
        sort= {queries.sort}
        sortDirection= {queries.sortDirection}
        page= {queries.page}
      />
      </>
      
    )

}