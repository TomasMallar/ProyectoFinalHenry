import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChocolatesByName } from "../Redux/Actions/Actions";


export default function DataManagement(props){
//     //Makes a dispatch each time home is mounted & requires info from backend.
const dispatch = useDispatch()

const name = props.name
const type = props.type
const sort = props.sort
const page = props.page
const sortDirection= props.sortDirection.trim()


    //Brings the information from the global state with useSelector
    useEffect(()=> {
        dispatch(getChocolatesByName(name, type, sort, sortDirection, page))
    }, [name,sort, sortDirection])
    let errors = useSelector((state) => state.errorMessage)

    if (errors.trim().length>0) { 
        alert (errors)
    }

return (
    <div>
       
    </div>
)  
}