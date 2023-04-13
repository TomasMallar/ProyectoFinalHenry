import React from "react"
import style from "./Footer.module.css"

const Footer = (props) => {
  return (
    <div className={style.PieDePag}>
      <div className={style.copyright}>
        <img src="https://res.cloudinary.com/dxh0l04wi/image/upload/v1681402134/Logo_Chocolate_Hub_hjvvek.png" alt="Logo" className={style.logoChoco} />
        <h1>The chocolate hub</h1>
        <h2>Exquisite Chocolate</h2>
        <h3>Copyright © 2022 - Todos los derechos reservados </h3>
      </div>
      <div className={style.contacts}>
        <div className={style.lineContact}> 
          <img src='https://cdn-icons-png.flaticon.com/512/87/87390.png' alt="LogoInst" className={style.logosImg} /> <a href="https://www.instagram.com/the_chocolatehub/?hl=es">@chocolate_hub</a>
        </div>
        <div className={style.lineContact}>
          <img src='https://www.freeiconspng.com/thumbs/email-icon/email-icon--clipart-best-22.png' alt="LogoMail" className={style.logosImg}/> <a href="mailto:chocolatehub@email.com">chocolatehub@email.com</a>
        </div>
        <div className={style.lineContact}>
          <img src='https://cdn-icons-png.flaticon.com/512/20/20673.png' alt="LogoFacebook" className={style.logosImg} /> <a href="https://www.facebook.com/people/The-chocolate-hub/100054213501503/">The Chocolate Hub</a>
        </div>
      </div>
    </div>
  )
};

export default Footer;
