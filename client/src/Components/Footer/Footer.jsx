import React from "react"
import style from "./Footer.module.css"
import logo from "../../img/logoBlack.png"

const Footer = (props) => {
  return (
    <div className="absolute flex justify-between w-full h-48 bg-chocolate-mantecol text-chocolate-oscuro">
      <div className="block">
        <img src={logo} alt="Logo" className="mt-5 ml-5 w-52" />
        <h3 className="mt-5 ml-5 font-serif ">
          Copyright © 2022 - Todos los derechos reservados
        </h3>
      </div>
      <div className="flex flex-col justify-center gap-6 font-serif w-96">

        <div className="flex items-center justify-start gap-6 text-chocolate-oscuro">
          <img src='https://cdn-icons-png.flaticon.com/512/87/87390.png' alt="LogoInst" className="w-8 " />
          <a href="https://www.instagram.com/the_chocolatehub/?hl=es">
            @chocolate_hub
          </a>
        </div>

        <div className="flex items-center justify-start gap-6 text-chocolate-oscuro">
          <img src='https://www.freeiconspng.com/thumbs/email-icon/email-icon--clipart-best-22.png' alt="LogoMail" className="w-8 " />
          <a href="mailto:chocolatehub@email.com">
            chocolatehub@email.com
          </a>
        </div>

        <div className="flex items-center justify-start gap-6 text-chocolate-oscuro">
          <img src='https://cdn-icons-png.flaticon.com/512/20/20673.png' alt="LogoFacebook" className="w-8 "/>
          <a href="https://www.facebook.com/people/The-chocolate-hub/100054213501503/">
            The Chocolate Hub
          </a>
        </div>

      </div>
    </div>
  )
};

export default Footer;
