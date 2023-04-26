import style from './Widget.module.css'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export default function Widget({type}) {
let data ;
//temporary : 
const amount = 100 
const percentage = 20
switch (type){
case "user" : 
    data = {
        title:"USERS",
        isMoney:false,
       link: "see all users",
       icon: (
        <PeopleAltOutlinedIcon className={style.icon} style = {{color:'crimson', backgroundColor:"rgba(255,0,0,0.2)"}}/>
       )

    }
    break;
   
    break;
    case "order" : 
    data = {
        title:"ORDERS",
        isMoney:false,
       link: "see all orders",
       icon: (
        <ShoppingCartOutlinedIcon className={style.icon} style = {{color:'goldenrod', backgroundColor:"rgba(218,165,32,0.2)"}}/>
       )

    }
    break;
    case "earning" : 
    data = {
        title:"EARNINGS",
        isMoney:true,
       link: "view net earnings",
       icon: (
        < AttachMoneyOutlinedIcon className={style.icon} style = {{color:'green', backgroundColor:"rgba(0,128,0,0.2)"}}/>
       )

    }
    break;
    case "balance" : 
    data = {
        title:"BALANCES",
        isMoney:true,
       link: "see details",
       icon: (
        <AccountBalanceWalletOutlinedIcon className={style.icon} style = {{color:'purple', backgroundColor:"rgba(128,0,128,0.2)"}}/>
       )

    }
    default:
    break ;
}
    return (
        <div className={style.widget}>
            <div className={style.left}>
                <span className={style.title}>{data.title}</span>
                {/* ACA VA LA CANTIDAD DE USUARIOS */}
                <span className={style.counter}>{data.isMoney && "$"}{amount}</span>
                <span className={style.link}> {data.link}</span>
            </div>
            <div className={style.right}>
                <div className={style.percentage} >
                    <ArrowUpwardOutlinedIcon />
                    {percentage}%</div>
            </div>
            {data.icon}
        </div>
    )
}