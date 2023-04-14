import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllChocolates } from "../Redux/Actions/Actions";
import HomePage from "./Home";


export default function DataManagement(){
//     //Makes a dispatch each time home is mounted & requires info from backend.
    const dispatch = useDispatch()

    //Brings the information from the global state with useSelector
    let allProducts = useSelector((state) => state.chocolates)
    
    
    let errors = useSelector((state) => state.errorMessage)

    if (errors.trim().length>0) { 
        alert (errors)
    }
    
    useEffect(()=> {
        dispatch(getAllChocolates())
    }, [dispatch])
return (
    <div>
        <HomePage allProducts={allProducts} />
    </div>
)  
}