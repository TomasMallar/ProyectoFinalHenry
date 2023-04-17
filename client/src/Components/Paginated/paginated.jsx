import { useSelector } from "react-redux";
import React, { useState } from "react";
import DataManagement from "../DataManagement";

export default function FilterBar(){

    //Brings the information from the global state with useSelector
let allProducts=useSelector((state)=> state.chocolates)
console.log(allProducts, "all products");
//------------------------FILTERING ------------------------------------------------

//set a local state for filtering by genre (ALL QUERIES)
let [queries, setQueries] = useState({
    inputName:"",
    origin:"",
    sort:"",
    page:"",
    
})

//-----------------------------------------Pages-----------------------------------
const handleonClickPages = (event) =>{
    if (event.target.value>0 && event.target.value<=allProducts.totalPages) {
        setQueries({...queries, page:event.target.value})
        console.log(event.target.value, "queries", "totalpages:", totalPages);   
    }

}
const totalPages = allProducts.totalPages
    const TotalPagesArray = []
    for (let i=1; i<= totalPages; i++){
        TotalPagesArray.push(i)
    }



//-----------------------------------------------------------------------------RETURN---------
return(
<>

    <div className="{styles.pagination}">
        {/* Buttons of the Pages */}
        <button value={1} onClick={handleonClickPages}>Inicio</button>
        <button value={queries.page-1} onClick={handleonClickPages}>Página anterior</button>
            {
            TotalPagesArray.map(p =>{
                return <button key={p} value={p} onClick={handleonClickPages}> {p} </button>
                })
            }
        <button value={Number(queries.page)+1} onClick={handleonClickPages}>Página Siguiente</button>
        <button value={Number(allProducts.totalPages)} onClick={handleonClickPages}>Final</button>
        
    </div>            
    <DataManagement 
            page = {queries.page}
                />



</>)

}
