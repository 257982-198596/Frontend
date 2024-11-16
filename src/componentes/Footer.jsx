import React from 'react'
import { FaReact } from "react-icons/fa";
import { IconContext } from "react-icons";

function Footer() {
  return (
    <div className="text-center p-3 bg-dark footerobl fixed-bottom">
   <span className='footer-proyecto'>Proyecto Integrador ATI 2024 <IconContext.Provider value={{ className: "iconofooter" }}>
            <FaReact></FaReact>
          </IconContext.Provider> Jenny Emayusa - Sebastián Berrospe </span>
    
  </div>
  )
}

export default Footer