import style from './Widget.module.css'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { GetInfo } from '../../Redux/Actions/ActionsDashboard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function Widget({type}) {
let data ;
const dispatch = useDispatch()
const info = useSelector((state) => state.metrics)
const currentMonthSales =  info.currentMonthSales 
const salesVariaton = info.salesVariaton
const currentYearTotalSales = info.currentYearTotalSales
const variationYear = info.VariationYear
const variationSemester =info.VariationSemester
const currentSemesterTotalSales = info.currentSemesterTotalSales

useEffect(()=>{
dispatch (GetInfo())
},[dispatch])

switch (type){
case "user" : 
    data = {
        // info:info.currentMonthSales,
        title:"USERS",
        isMoney:false,
       link: "see all users",
       path:"/users",
       icon: (
        <PeopleAltOutlinedIcon className={style.icon} style = {{color:'crimson', backgroundColor:"rgba(255,0,0,0.2)"}}/>
       )

    }
    break;
   
    break;
    case "order" : 
    data = {
        title:"VTA SEMESTRAL",
        isMoney:false,
       link: "Ver Todas las Ventas",
       icon: (
        <ShoppingCartOutlinedIcon className={style.icon} style = {{color:'goldenrod', backgroundColor:"rgba(218,165,32,0.2)"}}/>
       ),
       value:currentSemesterTotalSales,
       percentage:variationSemester,
       path:"/sales"

    }
    break;
    case "earning" : 
    data = {
        // info:info.currentMonthSales,
        title:"VTA MENSUAL",
        isMoney:true,
       link: "Ver Detalle de las Ventas",
       path:"/orders",
       icon: (
        < AttachMoneyOutlinedIcon className={style.icon} style = {{color:'green', backgroundColor:"rgba(0,128,0,0.2)"}}/>
       ),
       value:currentMonthSales,
        percentage:salesVariaton

    }
    break;
    case "balance" : 
    data = {
        // info:info.currentMonthSales,
        title:"VTA ANUAL",
        isMoney:true,
       link: "Ver más métricas",
       icon: (
        <AccountBalanceWalletOutlinedIcon className={style.icon} style = {{color:'purple', backgroundColor:"rgba(128,0,128,0.2)"}}/>
       ),
       value:currentYearTotalSales,
        percentage:variationYear,
        path:"/statistics"

    }
    default:
    break ;
}
    return (
        <div className={style.widget}>
            <div className={style.left}>
                <span className={style.title}>{data.title}</span>
                {/* ACA VA LA CANTIDAD DE USUARIOS */}
                <span className={style.counter}>{data.isMoney && "$"}{data.value}</span>
               <Link to={data.path}> <span className={style.link}> {data.link}</span></Link>
            </div>
            <div className={style.right}>
                <div className={style.percentage} >
                    { data.percentage > 0 ? 
                        <div className={style.percentagePos}> 
                    <ArrowUpwardOutlinedIcon />
                    {data.percentage}%
                    </div> : <div className={style.percentageNeg}>
                    <ArrowDownwardIcon />
                    {data.percentage}%
                    </div>
                }
                </div>
            </div>
            {data.icon}
        </div>
    )
}