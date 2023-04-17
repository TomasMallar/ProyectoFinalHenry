import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import DataManagement from "../DataManagement"
import styles from "./sortingAndFiltering.module.css"

export default function SortingAndFiltering (props){
    const [queries, setQueries] = useState({
        name: "",
        category: "",
        type: "",
        sort: "",
        sortDirection:"",
        page: 1
    })

    const statecategories = useSelector((state) => state.categories)
    const categories = statecategories.map(c => c.name)

    const statetypes = useSelector((state) => state.types)


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

//------------------------------------------Filtering--------------------------------------
const [fitlerCategories, setfitlerCategories] = useState([])
const [fitlerTypes, setfitlerTypes] = useState([])

//Set how the filters for categories will work in the query input 
function handleClick(category,id) {
  if (id.target.id==="category") {
      // if (category==="Clear") return setQueries({...queries, category:""})
      // setQueries({...queries, category:category})

  //-------------------------SELECCIONAR MULTIPLES CATEGORIAS---------------------------------------
          //if the category is already set as a filter, remove it from the list of filters
    if (category==="Clear") return setfitlerCategories([])
    if (fitlerCategories?.includes(category)) {
        let aux = fitlerCategories.filter((el)=>el!==category)
        setfitlerCategories(aux)
    } else {
    //if it is not, add it to the former array of categories
    setfitlerCategories([...fitlerCategories, category])
    }
  }
  if (id.target.id==="types") {
    // if (category==="Clear") return setQueries({...queries, type:""})
    // setQueries({...queries, type:category})

  //-------------------------SELECCIONAR MULTIPLES TIPOS---------------------------------------
    //if the category is already set as a filter, remove it from the list of filters
if (category==="Clear") return setfitlerTypes([])
if (fitlerTypes?.includes(category)) {
  let aux = fitlerTypes.filter((el)=>el!==category)
  setfitlerTypes(aux)
} else {
//if it is not, add it to the former array of categories
setfitlerTypes([...fitlerTypes, category])
}
}
    }
    useEffect(() => {
      setQueries({...queries,category:fitlerCategories,type:fitlerTypes})
    }, [fitlerCategories, fitlerTypes]);
console.log("categories:", fitlerCategories);
console.log("Types:", fitlerTypes);
    return (
        <div className={styles.containerFilters}><div>
        <div className={styles.continSearchbar}>
          <input type="text" name="searchProduct " value={queries.name} onChange={(event) => handleOnChangeSearchBar(event)} placeholder="Busca tu producto" className={styles.input}/>
        </div>
        <select id="Sort" onChange={SortName} className={styles.dropdown}>
                    <option hidden defaultValue="">Select a sorting Option</option>
                    <optgroup label="ID">
                    <option value="id, ASC" >Ascending</option>
                    <option value="id, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="NAME">
                    <option value="name, ASC" >Ascending</option>
                    <option value="name, DESC">Descending</option>
                    </optgroup>
                    <optgroup label="PRICE">
                    <option value="price, ASC">Lowest to Highest (1-5)</option>
                    <option value="price, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <optgroup label="SCORE">
                    <option value="score, ASC">Lowest to Highest (1-5)</option>
                    <option value="score, DESC">Highest to Lowest (1-5)</option>
                    </optgroup>
                    <option value="">Remove sort</option>
                </select>
      </div>
      <div className={styles.filteringButtons}>
      {categories?.map((c)=>{
            return <button
                id="category"
                key={c}
                onClick={(event) => handleClick(c, event)}
                className={fitlerCategories?.includes(c) ? styles.selected : ''}
                    >{c}
                </button>})}
        <button id="category" onClick={(event) => handleClick("Clear", event)}>Borrar todos los filtros</button>
      </div>

      <div className={styles.filteringButtons}>
      {statetypes?.map((c)=>{
            return <button
                id="types" 
                key={c}
                onClick={(event) => handleClick(c, event)}
                className={fitlerCategories?.includes(c) ? styles.selected : ''}
                    >{c}
                </button>})}
        <button id="types" onClick={(event) => handleClick("Clear", event)}>Borrar todos los filtros</button>
      </div>
      
      <DataManagement
        name= {queries.name}
        category= {queries.category}
        type= {queries.type}
        sort= {queries.sort}
        sortDirection= {queries.sortDirection}
        page= {queries.page}
      />
      </div>
      
    )

}