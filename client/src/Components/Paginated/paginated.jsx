// import { useSelector } from "react-redux";
// import React, { useState } from "react";
// export default function FilterBar(){

//     //Brings the information from the global state with useSelector
// let allProducts=useSelector((state)=> state.chocolates)
// console.log(allProducts, "pagination");
// //------------------------FILTERING ------------------------------------------------

// //set a local state for filtering by genre (ALL QUERIES)
// let [localPage, setQueries] = useState({
//     page:1 
// })

// //-----------------------------------------Pages-----------------------------------
// const handleonClickPages = (event) =>{
//     if (event.target.value>0 && event.target.value<=allProducts.totalPages) {
//         setQueries({...localPage, page:event.target.value})
//     }

// }
// const totalPages = allProducts.totalPages
//     const TotalPagesArray = []
//     for (let i=1; i<= totalPages; i++){
//         TotalPagesArray.push(i)
//     }



// // -----------------------------------------------------------------------------RETURN---------
// return(
// <>

//     <div className="{styles.pagination}">
//         {/* Buttons of the Pages */}
//         <button value={1} onClick={handleonClickPages}>Inicio</button>
//         <button value={localPage.page-1} onClick={handleonClickPages}>Página anterior</button>
//             {
//             TotalPagesArray.map(p =>{
//                 return <button key={p} value={p} onClick={handleonClickPages}> {p} </button>
//                 })
//             }
//         <button value={Number(localPage.page)+1} onClick={handleonClickPages}>Página Siguiente</button>
//         <button value={Number(allProducts.totalPages)} onClick={handleonClickPages}>Final</button>
        
//     </div>       




// </>)

// }
