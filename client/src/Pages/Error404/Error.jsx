
import React from 'react';
import { Link } from "react-router-dom";
import './Error404.css';


export default function Error404 () {
    
        return (
            <>
                <div className="wrapper">
                    
                    <span>404</span>
                    <p>                        
                        Tuviste un dulce error...
                    </p>
                    <Link to="/home">
                          <button type="button">Volver</button>
                    </Link>


                </div>
            </>
        );
}