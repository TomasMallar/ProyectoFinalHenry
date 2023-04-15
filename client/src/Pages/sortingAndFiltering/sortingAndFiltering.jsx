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
                    <optgroup label="ID">
                    <option value="ID, ASC" >Ascending</option>
                    <option value="ID, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="Name">
                    <option value="Name, ASC" >Ascending</option>
                    <option value="Name, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="Price">
                    <option value="Price, ASC">Lowest to Highest (1-5)</option>
                    <option value="Price, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <optgroup label="Score">
                    <option value="Score, ASC">Lowest to Highest (1-5)</option>
                    <option value="Score, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <option value="">Remove sort</option>
                </select>
      </div>
      <DataManagement
        name= {queries.name}
        type= {queries.type}
        sort= {queries.sort}
        sortDirection= {queries.sortDirection}
        page= {queries.page}
      />
      </>
      
    )

}