import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import DataManagement from "../../Components/DataManagement"
import styles from "./sortingAndFiltering.module.css"

export default function SortingAndFiltering(props) {
  const [queries, setQueries] = useState({
    name: "",
    category: "",
    type: "",
    sort: "",
    sortDirection: "",
    page: 1,
  })

  const statecategories = useSelector((state) => state.categories)
  const categories = statecategories.map(c => c.name)
  const allProducts = useSelector((state) => state.chocolates)

  const statetypes = useSelector((state) => state.types)


  const handleOnChangeSearchBar = (event) => {
    event.preventDefault()
    setQueries({ ...queries, name: event.target.value, page: 1 })
  }
  //------------------------------Sorting----------------------------------------------------
  function SortName(event) {
    const results = event.target.value
    let aux = results.split(",")
    setQueries({ ...queries, sort: aux[0], sortDirection: aux[1] })
  }

  //------------------------------------------Filtering--------------------------------------
  const [fitlerCategories, setfitlerCategories] = useState([])
  const [fitlerTypes, setfitlerTypes] = useState([])

  //Set how the filters for categories will work in the query input 
  function handleClick(category, id) {
    if (id.target.id === "category") {
      // if (category==="Clear") return setQueries({...queries, category:""})
      // setQueries({...queries, category:category})

      //-------------------------SELECCIONAR MULTIPLES CATEGORIAS---------------------------------------
      //if the category is already set as a filter, remove it from the list of filters
      if (category === "Clear") return setfitlerCategories([])
      if (fitlerCategories?.includes(category)) {
        let aux = fitlerCategories.filter((el) => el !== category)
        setfitlerCategories(aux)
      } else {
        //if it is not, add it to the former array of categories
        setfitlerCategories([...fitlerCategories, category])
      }
    }
    if (id.target.id === "types") {
      // if (category==="Clear") return setQueries({...queries, type:""})
      // setQueries({...queries, type:category})

      //-------------------------SELECCIONAR MULTIPLES TIPOS---------------------------------------
      //if the category is already set as a filter, remove it from the list of filters
      if (category === "Clear") return setfitlerTypes([])
      if (fitlerTypes?.includes(category)) {
        let aux = fitlerTypes.filter((el) => el !== category)
        setfitlerTypes(aux)
      } else {
        //if it is not, add it to the former array of categories
        setfitlerTypes([...fitlerTypes, category])
      }
    }
  }
  useEffect(() => {
    setQueries({ ...queries, category: fitlerCategories, type: fitlerTypes, page: 1 })
  }, [fitlerCategories, fitlerTypes]);


  //-----------------------------------------Pages-----------------------------------
  const handleonClickPages = (event) => {
    if (event.target.value > 0 && event.target.value <= allProducts.totalPages) {
      setQueries({ ...queries, page: event.target.value })
    }

  }
  const totalPages = allProducts.totalPages
  const TotalPagesArray = []
  for (let i = 1; i <= totalPages; i++) {
    TotalPagesArray.push(i)
  }


  return (
    <><div className="flex items-center w-full p-5 font-serif h-52">
      <div>
        <div >
          <input type="text" name="searchProduct " value={queries.name} onChange={(event) => handleOnChangeSearchBar(event)} placeholder="Busca tu producto" className="p-4 mb-2 text-base border-none shadow-sm bg-chocolate-mantecol w-45 rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom cursor-text focus:outline-chocolate-bombom" />
        </div>

        <select id="Sort" onChange={SortName} className="p-2 mb-2.5 text-base border-none shadow-sm cursor-pointer w-52 bg-chocolate-mantecol rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom font-serif">

          <option hidden defaultValue="">
            Select a sorting Option
          </option>
          <optgroup label="ID">
            <option value="id, ASC">
              Ascending
            </option>
            <option value="id, DESC">
              Descending
            </option>
          </optgroup>
          <optgroup label="NAME">
            <option value="name, ASC">
              Ascending
            </option>
            <option value="name, DESC">
              Descending
            </option>
          </optgroup>
          <optgroup label="PRICE">
            <option value="price, ASC">
              Lowest to Highest (1-5)
            </option>
            <option value="price, DESC">
              Highest to Lowest (1-5)
            </option>
          </optgroup>
          <optgroup label="SCORE">
            <option value="score, ASC">
              Lowest to Highest (1-5)
            </option>
            <option value="score, DESC">
              Highest to Lowest (1-5)
            </option>
          </optgroup>
          <option value="">
            Remove sort
          </option>
        </select>
      </div>
      <div className="flex flex-wrap justify-start h-full gap-1 ml-5">
        {categories?.map((c) => {
          return <button
            id="category"
            key={c}
            onClick={(event) => handleClick(c, event)}
            className={
              fitlerCategories?.includes(c) 
              ? "font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-oscuro border-chocolate-oscuro rounded-2xl text-chocolate-blanco" 
              
              : "font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro hover:bg-chocolate-oscuro hover:text-chocolate-blanco"}
          >
            {c}
          </button>
        })}
        <button id="category" onClick={(event) => handleClick("Clear", event)} className="font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-bombom border-chocolate-oscuro rounded-2xl text-chocolate-blanco">
          Borrar todos los filtros
        </button>
      </div>

      <div className="flex flex-wrap justify-start h-full gap-1 ml-5">
        {statetypes?.map((c) => {
          return <button
            id="types"
            key={c}
            onClick={(event) => handleClick(c, event)}
            className={
              fitlerCategories?.includes(c) 
              ? "font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-oscuro border-chocolate-oscuro rounded-2xl text-chocolate-blanco" 
              
              : "font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro hover:bg-chocolate-oscuro hover:text-chocolate-blanco"}
          >
            {c}
          </button>
        })}
        <button id="types" onClick={(event) => handleClick("Clear", event)} className="font-serif border border-solid shadow-sm cursor-pointer shadow-chocolate-bombom w-fit bg-chocolate-bombom border-chocolate-oscuro rounded-2xl text-chocolate-blanco">
          Borrar todos los filtros
        </button>
      </div>
      <div>
      </div>
      <DataManagement
        name={queries.name}
        category={queries.category}
        type={queries.type}
        sort={queries.sort}
        sortDirection={queries.sortDirection}
        page={queries.page} />

    </div>
      <div className="flex flex-wrap justify-center h-full gap-1 m-6 ">
        {/* Buttons of the Pages */}
        <button value={1} onClick={handleonClickPages} className="p-1 font-serif border border-solid shadow-sm cursor-pointer bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom hover:bg-chocolate-bombom hover:text-chocolate-blanco">
          Inicio
        </button>
        <button value={queries.page - 1} onClick={handleonClickPages} className="p-1 font-serif border border-solid shadow-sm cursor-pointer bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom hover:bg-chocolate-bombom hover:text-chocolate-blanco">
          Página anterior
        </button>
        {TotalPagesArray.map(p => {
          return <button key={p} value={p} onClick={handleonClickPages} className= {
            Number(queries.page) === (p) 
            ? " p-1 bg-chocolate-bombom border border-solid border-chocolate-oscuro rounded-2xl text-chocolate-blanco shadow-sm shadow-chocolate-bombom cursor-pointer font-serif"

            : "p-1 bg-chocolate-mantecol border border-solid border-chocolate-oscuro rounded-2xl text-chocolate-oscuro shadow-sm shadow-chocolate-bombom cursor-pointer font-serif hover:bg-chocolate-bombom hover:text-chocolate-blanco"
            }>
            {p}
          </button>
        })}
        <button value={Number(queries.page) + 1} onClick={handleonClickPages} className="p-1 font-serif border border-solid shadow-sm cursor-pointer bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom hover:bg-chocolate-bombom hover:text-chocolate-blanco">
          Página Siguiente
        </button>
        <button value={Number(allProducts.totalPages)} onClick={handleonClickPages} className="p-1 font-serif border border-solid shadow-sm cursor-pointer bg-chocolate-mantecol border-chocolate-oscuro rounded-2xl text-chocolate-oscuro shadow-chocolate-bombom hover:bg-chocolate-bombom hover:text-chocolate-blanco">
          Final
        </button>
      </div></>




  )

}